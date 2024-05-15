import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div class="contact-us">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form className="contact_form">
          <div className="input">
            Name : <input type="text" placeholder="Enter your name : " />{" "}
          </div>

          <div className="input">
            Email : <input type="text" placeholder="Enter your email : " />
          </div>

          <div className="input">
            Message:{" "}
            <textarea
              cols="30"
              rows="10"
              placeholder="Enter your message : "
            ></textarea>
          </div>
          <button className="btn_submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
