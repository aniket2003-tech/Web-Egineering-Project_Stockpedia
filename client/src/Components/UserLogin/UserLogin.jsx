import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserLogin.css";
import { Link, redirect, useNavigate} from 'react-router-dom';

const UserLogin = ({setIsLoggedIn,setMessage, setStatus}) => {
  // const history = useHistory();
  const [container, setContainer] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const [status, setStatus] = useState(false);
  const navigate = useNavigate(); // Import and use useNavigate hook


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = {
        username,
        password,
        email,
      };
      const response = await axios.post('/usersignin', userCredential);
      const { isAdmin, isSubscriber, profileImageUrl} = response.data;
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('isSubscriber', isSubscriber);
      localStorage.setItem('Username', username);
      localStorage.setItem('Email', email);
      localStorage.setItem('profileImageUrl', profileImageUrl);
      setMessage('Successfully signed in.');
      setStatus(true);
      setIsLoggedIn('true')
      setTimeout(() => {
        navigate('/'); // Use navigate to redirect to '/'
      }, 2000);
    } catch (error) {
      setStatus(false)
      setMessage('Error signing in. Please try again.');
    }
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus(false)
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('/usersignup', { username, password,email: email });
      setMessage(response.data.message);
      setStatus(true)
      setTimeout(() => {
        navigate('/user_login'); // Use navigate to redirect to '/'
      }, 2000);
    } catch (error) {
      setStatus(false)
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className={`login_container ${container}`}>
      <div className="forms-container">
        <div className="signin-signup">
        {/* {(message && status === true) && <div className="goodmessage">{message}</div>}
        {(message && status === false) && <div className="badmessage">{message}</div>} */}
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">User Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <Link to={"/admin_login"}><p>Or Sign in as an Admin</p></Link>
          </form>
          

          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title"> User Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
            <Link to={"/admin_login"}><p>Or Sign in as an Admin</p></Link>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="login_content">
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus est.</p>
            <button className="btn transparent" id="sign-up-btn" onClick={() => setContainer('sign-up-mode')}>Sign Up</button>
          </div>
          <img src="./img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="login_content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus est.</p>
            <button className="btn transparent" id="sign-in-btn" onClick={() => setContainer('')}>Sign In</button>
          </div>
          <img src="./img/register.svg" className="image" alt="" />
        </div>
      </div>
      {/* Display response message */}
    </div>
  );
};

export default UserLogin;
