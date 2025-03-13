
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const MFA = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30); // Countdown timer for resending OTP
    const email = sessionStorage.getItem('email') || ""; // Ensure email is always defined
    const navigate = useNavigate();

    // Function to verify OTP
    const verifyOTP = async () => {
        setError(""); // Clear previous errors
        setSuccess("");

        if (!otp.trim()) {
            setError("Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error response:", data);
                setError(data.detail?.msg || "Invalid OTP. Please try again.");
            } else {
                localStorage.setItem('token', data.token);
                navigate('/main');
            }
        } catch (error) {
            console.error("Request failed:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    // Function to resend OTP
    const resendOTP = async () => {
        setResendDisabled(true);
        setTimer(30); // Reset timer
        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Email is missing. Please login again.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }), // Ensure correct request format
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error response:", data);
                setError(data.detail?.[0]?.msg || "Failed to resend OTP. Please try again.");
                setResendDisabled(false); // Allow retry
            } else {
                setSuccess("A new OTP has been sent to your email.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            setError("Something went wrong. Please try again later.");
            setResendDisabled(false); // Allow retry
        }
    };

    // Countdown timer effect for OTP resend button
    useEffect(() => {
        if (resendDisabled && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(countdown);
        }

        if (timer === 0) {
            setResendDisabled(false);
        }
    }, [resendDisabled, timer]);

    return (
        <motion.div 
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
        >
            <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
                <motion.h2 
                    className="text-center text-danger mb-3"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    Multi-Factor Authentication
                </motion.h2>

                <p className="text-center text-muted">
                    An OTP has been sent to <strong>{email}</strong>. Please check your email.
                </p>

                <motion.input
                    type="text"
                    className="form-control text-center fs-5"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ letterSpacing: '3px', fontWeight: 'bold' }}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                />

                {error && (
                    <motion.p 
                        className="text-danger text-center mt-2"
                        initial={{ x: -10 }}
                        animate={{ x: 10 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.2 }}
                    >
                        {error}
                    </motion.p>
                )}

                {success && (
                    <motion.p 
                        className="text-success text-center mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {success}
                    </motion.p>
                )}

                <motion.button
                    className="btn btn-danger w-100 mt-3"
                    onClick={verifyOTP}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Verify OTP
                </motion.button>

                <div className="text-center mt-3">
                    <button 
                        className="btn btn-secondary" 
                        onClick={resendOTP} 
                        disabled={resendDisabled}
                    >
                        {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MFA;

