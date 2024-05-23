import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";


export default function SignUp() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/AddCluster");
  };

  return (
    <>
    <Navbar/>
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Create your Kubilyze Account</h1>
        <div className="formGroup">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Confirm Password:</label>
          <input type="text" id="password" name="password" />
        </div>
        <div className="submit">
          <button onClick={handleLoginClick}>Submit</button>
        </div>
      </div>
    </div>
    </>
  );
}
