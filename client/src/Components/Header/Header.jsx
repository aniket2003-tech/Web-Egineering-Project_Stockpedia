import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { VscThreeBars } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import logo from "../../assets/backgroun removed/heroic.jpg";

const Header = ({ isLoggedIn, handleLogout, setSearch, search }) => {
  const location = useLocation();
  let showSearchBar =
    location.pathname !== "/contact" &&
    location.pathname !== "/about" &&
    location.pathname !== "/user_login" &&
    location.pathname !== "/dashboard" &&
    location.pathname !== "/post" &&
    location.pathname !== "/subscribe" &&
    location.pathname !== "/adduser" &&
    location.pathname !== "/admin_login";

  const [isProfileHovered, setIsProfileHovered] = useState(false);

  // Function to toggle isProfileHovered state
  const toggleProfileHover = () => {
    setIsProfileHovered(!isProfileHovered);
  };

  return (
    <navbar className="nav">
      <div className="nav_link">
        <div className="logo">
          <img src={logo} alt="" />
          GROY
        </div>
        <div className="link">
          <Link to={"/"} style={{ textDecoration: "none" }} className="link_a">
            <p>Home</p>
          </Link>
          <Link
            to={"/stock_prediction"}
            style={{ textDecoration: "none" }}
            className="link_a"
          >
            <p>Stock Prediction</p>
          </Link>
          {showSearchBar && (
            <div className="nav-search">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CiSearch />
            </div>
          )}
          <Link
            to={"/about"}
            style={{ textDecoration: "none" }}
            className="link_a"
          >
            <p>About</p>
          </Link>

          <Link
            to={"/contact"}
            style={{ textDecoration: "none" }}
            className="link_a"
          >
            <p>Contact Us</p>
          </Link>

          {localStorage.getItem('isLoggedIn') === 'true' ? (
            <>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none" }}
                className="login_btn"
              >
                <h5>Dashboard</h5>
              </Link>
              <div
                className="profile_btn "
                onClick={toggleProfileHover} // Toggle isProfileHovered state on click
              >

                <p style={{ textDecoration: "none" }} className="link_a">Profile</p>
                {isProfileHovered && (
                 <div className="profile_card">
                 {/* Profile Card Content Goes Here */}
                 {/* For example: */}
                 <Link to="/profile" style={{textDecoration: "none"}}>
                 <img
                   src={localStorage.getItem('profileImageUrl')}
                   className="avatar"
                   alt="Profile Avatar"
                 />
                 <p className="profiletitle">Username: {localStorage.getItem('Username')}</p>
                 <p className="profiletitle">Email: {localStorage.getItem('Email')}</p> </Link>
                 <button className="logout_btn" onClick={handleLogout}> 
                   Logout
                 </button>
               </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/user_login"
              style={{ textDecoration: "none" }}
              className="login_btn"
            >
              <h5>Login</h5>
            </Link>
          )}
        </div>
      </div>
    </navbar>
  );
};

export default Header;
