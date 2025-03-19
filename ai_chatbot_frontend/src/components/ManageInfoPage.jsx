import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    background: "url('https://source.unsplash.com/1600x900/?city,urban') no-repeat center center fixed",
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
    maxWidth: '400px',
    width: '90%',
  },
  header: {
    textAlign: 'center',
    color: '#d32f2f',
    fontSize: '32px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  error: {
    color: '#ff0000',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

const UrbanRegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.detail || 'Registration failed');
      } else {
        await response.json();
        // Redirect to login page after successful registration
        navigate('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMsg('An error occurred during registration');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>Urban System Registration</div>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={styles.input}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default UrbanRegistrationForm;

