import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { Link } from "react-router-dom";
import { set } from "mongoose";

export default function NavbarDash({ username, setClusterName, setNodes, setCluster }) {
  const navigate = useNavigate();

  const handleLogOutClick = (e) => {
    if(e.target.alt) {
      setClusterName('')
      setNodes('')
      setCluster('')
      navigate('/')
    }
    else{
      setClusterName('')
      setNodes('')
      setCluster('')
      navigate("/login");
    }
  };
  return (
    <>
      <div id="navbar">
        <div className="logo">
          {/* Placeholder for Logo */}
            <img src={require("./logo.png")} alt="Logo" onClick={handleLogOutClick}/>
        </div>
        <div className="logotitle">
            <img src={require("./logotitle.png")} alt="Logo Title" onClick={handleLogOutClick} />
        </div>
        <div className="rightside">
          <a>Welcome, {username} </a>
          <div className="nav-links"></div>
          <div className="auth-button">
            <button onClick={handleLogOutClick}>Sign Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
