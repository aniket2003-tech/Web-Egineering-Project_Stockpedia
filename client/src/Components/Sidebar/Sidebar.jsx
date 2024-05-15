  import React from 'react'
  import './Sidebar.css';
  import {Link} from "react-router-dom"
  import { useNavigate } from 'react-router-dom';

    
  export const Sidebar = ({illu, setIsLoggedIn}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      // Set isAdmin, isLoggedIn, and isSubscriber to false in localStorage
      localStorage.setItem('isAdmin', false);
      localStorage.setItem('isLoggedIn', false);
      localStorage.setItem('isSubscriber', false);
      setIsLoggedIn('false')
      // Redirect to '/admin_login'
      navigate('/admin_login');
    };
    return (
      <>
          {/* <div class="navnamecontainer"> */}
            <navname class="navname">
              <div class="navname-upper-options">
              <Link to="/post" style={{ textDecoration: 'none' }}>
                <div className={`navname-option ${illu === 1 ? 'option2' : 'option1'}`}>
                  <img src=
                    "https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                    class="navname-img"
                    alt="dashboard" />
                  <h3> Post</h3>
                </div>
                  </Link>
                  <Link to="/subscribe" style={{ textDecoration: 'none' }}>
                <div className={`navname-option ${illu === 2 ? 'option2' : 'option1'}`}>
                  <img src=
                    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                    class="navname-img"
                    alt="articles" />
                  <h3> Subscribe</h3>
                </div>
                </Link>
                <Link to="/adduser" style={{ textDecoration: 'none' }}>
                <div className={`navname-option ${illu === 3 ? 'option2' : 'option1'}`}>
                  <img src=
                    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                    class="navname-img"
                    alt="report" />
                  <h3> Add User</h3>
                </div>
                </Link>
                  <div className={`navname-option option1`} onClick={()=>handleLogout()}>
                  <img src=
                    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                    class="navname-img"
                    alt="logout" />
                  <h3>Logout</h3>
                </div>
                </div>
            </navname>
          {/* </div> */}
      </>
    )
  }
  

