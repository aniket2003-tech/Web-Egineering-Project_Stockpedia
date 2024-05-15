import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css";

const AdminLogin = ({setMessage}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = {
        username,
        password,
        email
      };
  
      // Send the user credentials to the 'adminlogin' route
      const response = await axios.post('/adminlogin', userCredential);
  
      // Display the response message
      setMessage(response.data.message);
      
      // Redirect to dashboard if login successful
      if (response.data.isAdmin) {
        // Update local storage
        localStorage.setItem('isAdmin', response.data.isAdmin);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('isSubscriber', response.data.isSubscriber);
        localStorage.setItem('Username', response.data.username);
        localStorage.setItem('Email', response.data.email);
        
        navigate('/dashboard');
      } else {
        // If login is unsuccessful, display error message
        setMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('Server is not responding. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage('An unexpected error occurred. Please try again later.');
      }
      console.error('Error signing in:', error);
    }
  };
  

  return (
    <div className="formcontainer">
      <div className="">
        <form onSubmit={handleSignIn} className="sign-in-form">
          <h2 className="title" >Admin Sign In</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Login" className="btn solid" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
