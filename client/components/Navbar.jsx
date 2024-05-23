import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="navbar">
        <div className="logo">
          {/* Placeholder for Logo */}
          <Link to="/">
            <img src={require("./logo.png")} alt="Logo" />
          </Link>
          </div>
          <div className="logotitle">
          <img src={require("./logotitle.png")} alt="Logo Title" />
          </div>
        <div className="nav-links">
          <a href="/SignUp">Docs</a>
          <a href="/page2">GitHub</a>
        </div>
        <div className="auth-button">
          <button onClick={handleLoginClick}>Sign In</button>
        </div>
      </div>
    </>
  );
}
