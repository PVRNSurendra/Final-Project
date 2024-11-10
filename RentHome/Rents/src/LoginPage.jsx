import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';  // Optional for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    console.log('Sending login request:', { email, password });  // Log the payload here
  
    try {
      const response = await axios.post('http://localhost:1026/login', { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        alert('Login successful!');
        setEmail('');
        setPassword('');
        navigate('/');  // Navigate to the home page/dashboard
      }
    } catch (error) {
      console.error(error);  // Log the full error for debugging
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An error occurred. Please check your network or try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to HomeRental</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
