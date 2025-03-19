import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const chatEndRef = useRef(null); // Ref for scrolling to the latest message

  // ✅ Initialize session on first load
  useEffect(() => {
    const storedSession = sessionStorage.getItem("chatSessionId");
    if (storedSession) {
      setSessionId(storedSession);
      fetchChatHistory(storedSession);
    } else {
      startNewSession();
    }
  }, []);

  // ✅ Function to Start a New Chat Session
  const startNewSession = () => {
    const newSession = Math.random().toString(36).substring(7);
    sessionStorage.setItem("chatSessionId", newSession);
    setSessionId(newSession);
    setMessages([]);
    setChatHistory([]);
  };

  // ✅ Fetch Chat History from ChromaDB-backed API
  const fetchChatHistory = async (session) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/chat/history/?session_id=${session}`);
      if (res.data.history) {
        setMessages(res.data.history);
        setChatHistory(res.data.history.map((msg, i) => ({ id: i, text: msg.text })));
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // ✅ Function to Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // ✅ Handle Sending User Message
  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newUserMessage = { sender: "user", text: trimmed };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setChatHistory((prevHistory) => [...prevHistory, { id: prevHistory.length, text: trimmed }]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const userId = "user-1234"; // Ideally, fetch from authentication
      const timestamp = new Date().toISOString();

      const res = await axios.post("http://localhost:8000/api/chat/", {
        query: trimmed,
        session_id: sessionId,
        user_id: userId,
        timestamp: timestamp
      });

      const botMessage = {
        sender: "bot",
        text: res.data.response || "No response from AI",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error: Unable to get a response from the server.");
    }
    setLoading(false);
  };

  // ✅ Scroll to the bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar for Chat History */}
      <div style={{ width: "250px", backgroundColor: "#1c1c24", padding: "15px", color: "white", display: "flex", flexDirection: "column" }}>
        <button
          style={{
            backgroundColor: "#444",
            color: "white",
            padding: "10px",
            border: "none",
            width: "100%",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
          onClick={startNewSession}
        >
          + New Chat
        </button>

        <select style={{ padding: "8px", marginBottom: "15px", width: "100%", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px" }}>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
        </select>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {chatHistory.map((chat) => (
            <div key={chat.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ cursor: "pointer" }}>💬 {chat.text.substring(0, 20)}...</span>
              <button
                onClick={() => setChatHistory(chatHistory.filter((c) => c.id !== chat.id))}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "gray",
                  cursor: "pointer",
                }}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Profile and Sign Out */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img src="https://i.pravatar.cc/100" alt="User Avatar" style={{ borderRadius: "50%" }} />
          <button onClick={handleLogout}
            style={{
              marginTop: "10px",
              padding: "8px",
              backgroundColor: "#444",
              color: "white",
              border: "none",
              borderRadius: "5px",
              width: "100%",
            }}
          >
            Sign Out
          </button>
          <p style={{ fontSize: "12px", marginTop: "10px" }}>Developed by <a href="#" style={{ color: "lightblue" }}>Om V. Patel</a></p>
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>My Chatbot</h2>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            height: "400px",
            overflowY: "scroll",
            padding: "16px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === "bot" ? "left" : "right",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "16px",
                  backgroundColor: msg.sender === "bot" ? "#f0f0f0" : "#007bff",
                  color: msg.sender === "bot" ? "#000" : "#fff",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <p style={{ textAlign: "center" }}>Thinking...</p>}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} style={{ marginTop: "10px", display: "flex" }}>
          <input
            style={{ flex: 1, padding: "10px" }}
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              marginLeft: "8px",
            }}
            type="submit"
          >
            🖊 SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
