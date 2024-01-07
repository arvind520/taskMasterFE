import React from "react";
import "./AboutUs.css";
import ShineText from "../common/textAnimation/ShineText";

const AboutUs = () => {
  return (
    <div className="aboutus d-flex justify-content-center align-items-center">
      <div className="container">
        <ShineText text="About Us" />
        <div style={{borderBottom: "1px solid red", width: "170px"}}></div>
        <p className="mt-3">
          Welcome to TaskMaster, a cutting-edge project management application
          built on the MERN (MongoDB, Express, React, Node.js) stack. Our team
          is dedicated to providing a seamless and intuitive platform for
          individuals and businesses to organize tasks, track progress, and
          collaborate effectively. With expertise in full-stack development, we
          aim to deliver a dynamic user experience and robust functionality. Our
          passion for leveraging the latest technology and best practices drives
          us to constantly innovate and improve TaskMaster. Join us in making
          task management simple, efficient, and enjoyable.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
