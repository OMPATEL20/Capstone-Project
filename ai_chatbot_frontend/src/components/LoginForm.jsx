
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/Urban-Systems-logo.jpg';

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
    textAlign: 'center',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  header: {
    color: '#d32f2f',
    fontSize: '28px',
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
  registerButton: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: '#ff0000',
    marginBottom: '10px',
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#d32f2f',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'block',
    textDecoration: 'underline',
  },
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.detail || 'Login failed');
      } else {
        // Save email in session storage for MFA
        sessionStorage.setItem('email', email);
        navigate('/mfa'); // Redirect to MFA page
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMsg('An error occurred during login');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img src={logo} alt="Urban Systems Logo" style={styles.logo} />
        <div style={styles.header}>Urban Systems Login</div>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <button onClick={() => navigate('/register')} style={styles.registerButton}>Register</button>
        <a onClick={() => navigate('/forgot-password')} style={styles.forgotPassword}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default LoginForm;
