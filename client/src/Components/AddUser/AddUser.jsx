// AddUser.js

import React, { useState } from 'react';
import './AddUser.css';
import axios from 'axios';
import { Sidebar } from '../Sidebar/Sidebar';
import { checkCredentials } from '../Dashboard/Utils';
import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const AddUser = ({setMessage, setStatus}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      username,
      startDate,
      endDate,
      isAdmin,
      isSubscriber,
    };

    axios.post('/submituser', formData)
      .then((response) => {
        setMessage(response.data.message);
        setStatus(true)
      })
      .catch((error) => {
        setMessage(error.response.data);
        setStatus(false)
      });
  };

  return (
    <div className="main">
      <div className="box-container">
        <div className="form-container">
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Subscription Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">Subscription End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isAdmin">Is Admin:</label>
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isSubscriber">Is Subscriber:</label>
              <input
                type="checkbox"
                id="isSubscriber"
                checked={isSubscriber}
                onChange={(e) => setIsSubscriber(e.target.checked)}
              />
            </div>
            <button className="subbtn" type="submit">Submit</button>
          </form>
        </div>
      </div>

    </div>

  );
};

const AddUserRoute = ({setMessage, setStatus,illu, setIsLoggedIn }) => {
  const navigate = useNavigate();
    const [allowAccess, setAllowAccess] = useState(checkCredentials(navigate)); // Pass navigate to checkCredentials
  
    useEffect(() => {
      const isAuthenticated = checkCredentials(navigate); // Pass navigate to checkCredentials
      setAllowAccess(isAuthenticated);
      if (!isAuthenticated) {
        navigate('/admin_login');
      }
    }, [navigate]);
  return allowAccess ? (
    <>
      <div style={{ display: 'flex', width: '100vw', position: 'relative', zIndex: 1 }}>
        <Sidebar illu={illu} setIsLoggedIn={setIsLoggedIn} />
        <AddUser  setMessage={setMessage} setStatus={setStatus} />
      </div>
    </>
  ) : (
    setTimeout(() => {
      navigate('/admin_login');
  }, 0)
  );
};

export default AddUserRoute;
