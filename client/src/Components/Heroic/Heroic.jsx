import React from "react";
import "./Heroic.css";
import logo from "../../assets/backgroun removed/heroic_logo.png"

const Heroic = () => {
  return (
    <div className="heroic">
      <div className="heroic_section">
        <p className="green">E-Waste Recycling</p>
        <h2 className="heroic_heading green">
          Reduce, Reuse, Recycle - Keep e-waste out of sight!
        </h2>
        <div className="heroic_container">
          <div className="heroic_container_right">
          <p  >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididuntenim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo con Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatu Excepteur sint occaecat cupidatat non
            proident, sunt in{" "}
          </p>
          <div className="heroic_btn">
          <p>How to recycle ? </p>
        </div>
          </div>
          
          <div className="heroic_logo">
            <img width={"250px"} src={logo} alt="logo" />
        </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Heroic;
