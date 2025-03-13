from fastapi import FastAPI, HTTPException, status, Query
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
import bcrypt
import uuid
from datetime import datetime
import openai
import os
from dotenv import load_dotenv
import traceback

# Load environment variables
load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API Key not found in environment variables.")

# Initialize OpenAI client (NEW API FORMAT)
client = openai.OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI()

# Enable CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection settings using Motor
MONGO_DETAILS = "mongodb://localhost:27017"
mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
db = mongo_client.ai_chatbot_db  # Database name
users_collection = db.get_collection("users")
chat_history_collection = db.get_collection("chat_history")

# Pydantic models for requests
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    query: str
    session_id: str = None  
    user_id: str = None
    timestamp: str = None

# Utility function to get user by email
async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

# Registration endpoint
@app.post("/api/register")
async def register(request: RegisterRequest):
    existing_user = await get_user_by_email(request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = bcrypt.hashpw(request.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = {
        "name": request.name,
        "email": request.email,
        "password": hashed_password,
    }

    result = await users_collection.insert_one(new_user)
    created_user = await users_collection.find_one({"_id": result.inserted_id})

    return {
        "message": "Registration successful",
        "name": created_user.get("name"),
        "email": created_user.get("email"),
    }

# Login endpoint
@app.post("/api/login")
async def login(request: LoginRequest):
    user = await get_user_by_email(request.email)
    if not user or not bcrypt.checkpw(request.password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "message": "Login successful",
        "name": user.get("name"),
        "email": user.get("email"),
    }

# Chat endpoint (FIXED)
@app.post("/api/chat/")
async def chat(request: ChatRequest):
    try:
        session_id = request.session_id or str(uuid.uuid4())
        if not request.timestamp:
            request.timestamp = datetime.utcnow().isoformat()

        # OpenAI API request (NEW FORMAT)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an AI chatbot that assists users."},
                {"role": "user", "content": request.query},
            ],
        )

        response_text = response.choices[0].message.content

        # Store chat history in MongoDB
        chat_entry = {
            "session_id": session_id,
            "user_id": request.user_id,
            "query": request.query,
            "response": response_text,
            "timestamp": request.timestamp,
        }
        await chat_history_collection.insert_one(chat_entry)

        return {"session_id": session_id, "response": response_text}
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# Chat history retrieval
@app.get("/api/chat/history/")
async def get_chat_history(session_id: str = Query(..., description="Session ID to fetch chat history")):
    try:
        history_cursor = chat_history_collection.find({"session_id": session_id})
        history = await history_cursor.to_list(length=100)

        formatted_history = [
            {"sender": "user", "text": entry["query"]} if "query" in entry else {"sender": "bot", "text": entry["response"]}
            for entry in history
        ]
        return {"session_id": session_id, "history": formatted_history}
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# Test endpoints
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI using MongoDB"}

@app.get("/api/status")
async def get_status():
    return {"status": "Server is up and running"}
