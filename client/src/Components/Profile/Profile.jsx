import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: localStorage.getItem('Username'),
    email: localStorage.getItem('Email'),
    profileImageUrl: localStorage.getItem('profileImageUrl'),
    profileImage: null
  });

  // Check if user is logged in, if not, redirect to '/'
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return navigate('/')
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDone = () => {
    // Prepare form data
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('profileImage', userData.profileImage);
    formData.append('oldEmail', localStorage.getItem('Email'));
    formData.append('oldUsername', localStorage.getItem('Username'));
    formData.append('oldProfileImageUrl', localStorage.getItem('profileImageUrl'));

    // Send request to '/editprofile' route with formData
    fetch('/editprofile', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        throw new Error('Failed to update profile'); // Throw error for failed response
      }
    })
    .then(data => {
      // Update local storage with updated user data
      localStorage.setItem('Username', data.user.username);
      localStorage.setItem('Email', data.user.email);
      localStorage.setItem('profileImageUrl', data.user.profileImageUrl);
    })
    .catch(error => {
      console.error(error); // Log error to console
      // Handle error
    });

    setEditing(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleImageChange = e => {
    setUserData(prevUserData => ({
      ...prevUserData,
      profileImage: e.target.files[0],
      profileImageUrl: URL.createObjectURL(e.target.files[0])
    }));
  };

  return (
    <>
      <div className="profile-page">
        <h1 className='profile-header'>Profile Page</h1>

        <section className="profile-section">
          <div className="profile-picture">
            <img src={userData.profileImageUrl} className={editing ? 'profile-image-editing' : 'profile-image'} alt="Profile" />
            {editing && (
              <>
                <label htmlFor="profileImage" className="file-upload-label">
                  Choose Profile Image
                  <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
                </label>
              </>
            )}
          </div>
          <div className="profile-details">
            {editing ? (
              <>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" className="profile-input" value={userData.username} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" className="profile-input" value={userData.email} onChange={handleChange} />
              </>
            ) : (
              <ul>
                <li>Username: {userData.username}</li>
                <li>Email: {userData.email}</li>
              </ul>
            )}
          </div>
        </section>

        <div id="profile-container">
          {editing ? (
            <button type="button" className="profile-button" onClick={handleDone}>Done</button>
          ) : (
            <button type="button" className="profile-button" onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
    </>
  );
};
