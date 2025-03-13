
from fastapi import FastAPI, HTTPException, status, Query, BackgroundTasks
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
import bcrypt
import uuid
import secrets
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import traceback
from datetime import datetime
import openai
import random

# Load environment variables
load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API Key not found in environment variables.")

# Initialize OpenAI client
client = openai.OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI()

# Enable CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection settings using Motor
MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://localhost:27017")
mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
db = mongo_client.ai_chatbot_db
users_collection = db.get_collection("users")
chat_history_collection = db.get_collection("chat_history")

# SMTP Email Settings
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))

# Pydantic models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class OTPRequest(BaseModel):
    email: EmailStr
    otp: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class ChatRequest(BaseModel):
    query: str
    session_id: str = None  
    user_id: str = None
    timestamp: str = None

# Request Model for Resending OTP
class ResendOTPRequest(BaseModel):
    email: EmailStr


# Utility function to get user by email
async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

# Password Hashing
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# Generate a random OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Generate reset token for password recovery
def generate_reset_token():
    return secrets.token_urlsafe(32)

# Email Sending Function
def send_email(email: str, subject: str, message: str):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = EMAIL_SENDER
    msg["To"] = email
    msg.set_content(message)
    
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.send_message(msg)

# Registration Endpoint
@app.post("/api/register")
async def register(request: RegisterRequest):
    existing_user = await get_user_by_email(request.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(request.password)
    new_user = {"name": request.name, "email": request.email, "password": hashed_password, "otp": None}
    await users_collection.insert_one(new_user)
    return {"message": "Registration successful"}

# Login Endpoint (Triggers MFA)
@app.post("/api/login")
async def login(request: LoginRequest, background_tasks: BackgroundTasks):
    user = await get_user_by_email(request.email)
    if not user or not bcrypt.checkpw(request.password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate and store OTP in MongoDB
    otp_code = generate_otp()
    await users_collection.update_one({"email": request.email}, {"$set": {"otp": otp_code}})
    
    # Send OTP via email
    background_tasks.add_task(send_email, request.email, "Your OTP Code", f"Your OTP is: {otp_code}")

    return {"message": "OTP sent to your email", "email": request.email}

# Verify OTP Endpoint
@app.post("/api/verify-otp")
async def verify_otp(request: OTPRequest):
    user = await get_user_by_email(request.email)
    if not user or user.get("otp") != request.otp:
        raise HTTPException(status_code=401, detail="Invalid OTP")

    # Clear OTP after successful verification
    await users_collection.update_one({"email": request.email}, {"$unset": {"otp": ""}})
    
    return {"message": "MFA Successful"}
# Resend OTP Endpoint
@app.post("/api/resend-otp")
async def resend_otp(request: ResendOTPRequest, background_tasks: BackgroundTasks):
    if not request.email:
        raise HTTPException(status_code=400, detail="Email is required")

    user = await get_user_by_email(request.email)  # Check if user exists
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Generate a new OTP
    otp_code = str(random.randint(100000, 999999))
    await users_collection.update_one({"email": request.email}, {"$set": {"otp": otp_code}})

    # Send OTP via email
    background_tasks.add_task(send_email, request.email, "Your New OTP Code", f"Your new OTP is: {otp_code}")

    return {"message": "A new OTP has been sent to your email"}
# Forgot Password Endpoint
@app.post("/api/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, background_tasks: BackgroundTasks):
    user = await get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    reset_token = generate_reset_token()
    await users_collection.update_one({"email": request.email}, {"$set": {"reset_token": reset_token}})
    
    reset_link = f"http://localhost:3000/reset-password/{reset_token}"
    background_tasks.add_task(send_email, request.email, "Password Reset Request", f"Click to reset: {reset_link}")
    
    return {"message": "Password reset link sent to email"}

# Reset Password Endpoint
@app.post("/api/reset-password")
async def reset_password(request: ResetPasswordRequest):
    user = await users_collection.find_one({"reset_token": request.token})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    hashed_password = hash_password(request.new_password)
    await users_collection.update_one({"reset_token": request.token}, {"$set": {"password": hashed_password}, "$unset": {"reset_token": ""}})
    
    return {"message": "Password reset successful"}

# Chat Endpoint
@app.post("/api/chat/")
async def chat(request: ChatRequest):
    try:
        session_id = request.session_id or str(uuid.uuid4())
        if not request.timestamp:
            request.timestamp = datetime.utcnow().isoformat()

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an AI chatbot that assists users."},
                {"role": "user", "content": request.query},
            ],
        )

        response_text = response.choices[0].message.content

        chat_entry = {"session_id": session_id, "user_id": request.user_id, "query": request.query, "response": response_text, "timestamp": request.timestamp}
        await chat_history_collection.insert_one(chat_entry)

        return {"session_id": session_id, "response": response_text}
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# API Status Endpoints
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI using MongoDB"}

@app.get("/api/status")
async def get_status():
    return {"status": "Server is up and running"}
