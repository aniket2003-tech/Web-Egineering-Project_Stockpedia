import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Subscriber.css'
import { Sidebar } from '../Sidebar/Sidebar';
import { checkCredentials } from '../Dashboard/Utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Subscriber = ({setMessage, setStatus}) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState('')
    function handleChange(e) {
        console.log(e.target.files);
        setImg(e.target.files[0]);
    }
    function sendData(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('image', img); // Assuming 'img' holds the image file

        axios.post('/upload-subscribed', formData, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then((res) => {
            setMessage(res.data.message)
            setStatus(true)
        }).catch((error) => {
            setMessage(error.res.data)
            setStatus(false)
        });
    }
    return (
        <>
            <div className="main">
                <div className="box-container">
                    <div className="form-container">
                <h2>Subscriber</h2>
                        <form id="myForm" enctype="multipart/form-data" onSubmit={sendData}>
                            <div className="form-group">
                                <label for="title">Title:</label>
                                <input style={{ width: '400px' }} value={title}
                                    onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea rows={10} style={{ width: '400px' }} value={desc}
                                    onChange={(e) => setDesc(e.target.value)} id="description" name="description" required></textarea>
                            </div>

                            <div className="form-group">
                                <label for="image">Upload Image:</label>
                                <input style={{ width: '300px', height: '40px' }} onChange={handleChange} type="file" id="image" name="image" accept="image/*" required />
                            </div>
                            <button className='subbtn' type="submit">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

const SubscriberRoute = ({setMessage, setStatus, illu, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [allowAccess, setAllowAccess] = useState(checkCredentials(navigate)); // Pass navigate to checkCredentials
  
    useEffect(() => {
      const isAuthenticated = checkCredentials(navigate); // Pass navigate to checkCredentials
      setAllowAccess(isAuthenticated);
      if (!isAuthenticated) {
        navigate('/admin_login');
      }
    }, [navigate]);
  
    return (
      <div style={{ display: 'flex', width: '100vw', position: 'relative', zIndex: 1 }}>
        <Sidebar illu={illu} setIsLoggedIn={setIsLoggedIn} />
        <Subscriber setMessage={setMessage} setStatus={setStatus}/>
      </div>
    );
  };
  

export default SubscriberRoute;

