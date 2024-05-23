import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";


// import { useNavigate } from "react-router-dom";
// import "../styles.css";

export default function AddCluster() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/selectcluster");
  };
  return (
    <>
    <NavbarDash/>
    <div className="entirepage">
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Add Your EKS Cluster</h1>
        <div className="formGroup">
          <input type="text" id="username" placeholder="Access Key ID" name="username" />
        </div>
        <div className="formGroup">
          <input type="text" id="password" placeholder="Secret Access Key" name="password" />
        </div>
        <div className="submit">
          <button onClick={handleLoginClick}>Submit</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
