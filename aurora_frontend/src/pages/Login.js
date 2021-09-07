import React from "react";
import settings from "../config";
import "../styles/Login.css";
import "../styles/background.sass";
import logo from "../images/ap_logotext_white.png";

export const Login = () => {
  const handleClick = () => {
    const target = settings.BACKEND_DOMAIN + "/auth";
    window.location.href = target;
  };


  return (
    <div className="mainContainerLogin">
      <div className="titleLogin">
        <h3></h3>
      </div>
      <div className = "backgroundLogin">
        {/* <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div> */}
      </div>
      
      {/* <div id="title"></div> */}
      
       
      <div className="loginBox">
       
          <img className="iconlogin" src={logo} alt="Aurora Icon" />

        
          <button className="loginBtn" onClick={handleClick}>
            <div className = "loginText">
              LOGIN
            </div>
          </button>
        
      </div>

     
        
    </div>
  );
};

export default Login;
