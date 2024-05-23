import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { Link } from "react-router-dom";

export default function NavbarDash({username}) {
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
          <Link to="/">
            <img src={require("./logotitle.png")} alt="Logo Title" />
          </Link>
        </div>
        <div className="rightside">
        <a>Welcome, {"  "+ username}</a>
        <div className="nav-links">
        </div>
        <div className="auth-button">
          <button onClick={handleLoginClick}>Sign Out</button>
        </div>
        </div>
      </div>
    </>
  );
}
