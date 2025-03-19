import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { title, date_range: date, description };

    try {
      await axios.post("http://127.0.0.1:8000/add-event/", eventData);
      setPreview(eventData);
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left - Form Section */}
      <div style={styles.formSection}>
        <h2 style={styles.heading}>ADD INFORMATION</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Date (e.g., July 10 - July 15, 2024)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Enter event description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <button style={styles.addSectionBtn}>➕ ADD SECTION</button>
        <button style={styles.submitBtn} onClick={handleSubmit}>SUBMIT</button>
      </div>

      {/* Right - Preview Section */}
      <div style={styles.previewSection}>
        <h2 style={styles.heading}>PREVIEW</h2>
        {preview ? (
          <>
            <h3 style={styles.previewTitle}>{preview.title}</h3>
            <p style={styles.previewDate}><b>{preview.date_range}</b></p>
            <h4 style={styles.previewSubtitle}>Executive Summary</h4>
            <p style={styles.previewDescription}>{preview.description}</p>
          </>
        ) : (
          <p>No preview available</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  formSection: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    width: "40%",
    textAlign: "left",
    margin: "10px",
  },
  previewSection: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    width: "40%",
    textAlign: "left",
    margin: "10px",
  },
  heading: {
    borderBottom: "2px solid red",
    paddingBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    background: "#333",
    border: "none",
    color: "white",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    background: "#333",
    border: "none",
    color: "white",
    borderRadius: "5px",
    height: "100px",
  },
  addSectionBtn: {
    background: "#d32f2f",
    color: "white",
    padding: "10px",
    border: "none",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  submitBtn: {
    background: "red",
    color: "white",
    padding: "10px",
    border: "none",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  previewTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  previewDate: {
    fontSize: "16px",
    color: "#ff6f61",
  },
  previewSubtitle: {
    fontSize: "18px",
    marginTop: "10px",
    fontWeight: "bold",
  },
  previewDescription: {
    fontSize: "14px",
    color: "#ccc",
  },
};

export default EventForm;
