import React from "react";
import "./About.css";
import img from "../../assets/backgroun removed/picewaste.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div class="about-area">
      <div class="about_container">
        <div class="about-img">
          <img src={img} alt="picewaste" />
        </div>
      </div>

      <div class="about-text">
        <h2>About Us</h2>
        <p>
          {" "}
          <b>Personal Convenience:</b> We help users find the nearest e-waste
          recycling centers or collection points, making it easier to dispose of
          old electronics properly and get rewarded in the form of cash and
          credit points.
        </p>

        <p>
          {" "}
          <b>Education and Conservation:</b> Our platform offers comprehensive
          information on proper disposal of electronics, raising awareness and
          educating users about responsible e-waste management.
        </p>

        <p>
          {" "}
          <b>Illegal Dumping:</b> By making it easier to find legitimate
          disposal options, our locator can discourage the illegal dumping of
          electronic waste in unauthorized locations.
        </p>

        <p>
          {" "}
          <b>Data Security:</b> E-waste often contains sensitive data. Our
          website can help individuals and businesses find certified e-waste
          recycling facilities that offer secure data destruction services.
        </p>

        <p>
          {" "}
          <b>Government Initiatives:</b> Governments can use this e-waste
          locator as part of their e-waste management programs, promoting
          responsible disposal among citizens.
        </p>

        <p>
          {" "}
          <b>Sustainability Efforts:</b> Individuals and organizations committed
          to sustainability can use this locator to contribute to the circular
          economy by recycling and reusing electronics.
        </p>

        <p>
          {" "}
          <b>Businesses:</b> It ensures compliance with e-waste regulations by
          identifying approved recycling facilities, businesses can integrate
          e-waste recycling into CSR efforts.
        </p>

        <Link href="#">Learn More</Link>
      </div>
    </div>
  );
};

export default About;
