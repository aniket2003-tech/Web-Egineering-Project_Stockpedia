import React from "react";
import "./Footer.css";
import logo from "../../assets/backgroun removed/heroic_logo.png";
import { Link } from "react-router-dom";

import { BsFacebook, BsWhatsapp, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="footer-main">
        <div className="footer-links">
          <p>Home</p>
          <p>Pricing</p>
          <p>Contact Us</p>
          <p>Terms and Conditions</p>

          <p>About Us</p>
          <p>Blog</p>
          <p>Safety and Security</p>
          <p>Privacy Policy</p>

          <p>Benefits</p>
          <p>Disclaimer</p>
        </div>
        <div className="footer-icons">
          
          <BsFacebook />
          <BsWhatsapp />
          <BsTwitter />
          <BsInstagram />
        </div>
      </div>
    </>
  );
};

export default Footer;
