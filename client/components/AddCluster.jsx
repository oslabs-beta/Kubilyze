import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import "../styles.css";

export default function AddCluster() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/Dashboard");
  };
  return (
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Add Your EKS Cluster</h1>
        <div className="formGroup">
          <label htmlFor="username">Access Key ID:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Secret Access Key:</label>
          <input type="text" id="password" name="password" />
        </div>
        <div className="submit">
          <button onClick={handleLoginClick}>Submit</button>
        </div>
      </div>
    </div>
  );
}
