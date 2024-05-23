import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { Link } from "react-router-dom";

export default function NavbarDash() {
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
        <div className="nav-links">
        </div>
        <div className="auth-button">
          <button onClick={handleLoginClick}>Sign Out</button>
        </div>
      </div>
    </>
  );
}
