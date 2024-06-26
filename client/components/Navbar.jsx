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
          <Link to="/">
            <img src={require("./logotitle.png")} alt="Logo Title" />
          </Link>
        </div>
        <div className="nav-links">
          <a href="https://medium.com/@nutzela/kubilyze-simplifying-observability-for-eks-kubernetes-clusters-03a8b5495049">Docs</a>
          <a href="https://github.com/oslabs-beta/Kubernetes-OSP">GitHub</a>
        </div>
        <div className="rightside">
        <div className="auth-button">
          <button onClick={handleLoginClick}>Sign In</button>
        </div>
        </div>
      </div>
    </>
  );
}
