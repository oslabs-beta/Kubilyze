import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";


// import { useNavigate } from "react-router-dom";
// import "../styles.css";

export default function AddCluster({username, setClusterName, setCluster, setNodes}) {
  const [accessInfo, setAccessInfo] = useState({accesskey: '', secretkey: '', sessiontoken: '', region: ''})
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setAccessInfo({...accessInfo, [e.target.name]: e.target.value})
  }

  const addCredentials = () => {
    fetch('https://kubilyze-32a4b0d50531.herokuapp.com/user/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...accessInfo, username})
    })
    .then((response)=> {
      if(response.ok) return response.json()
        console.log('an error happened in the server')
    })
    .then(user=> {
      if(user) {
        console.log(user)
        navigate("/selectcluster");
      }
      setAccessInfo({accesskey: '', secretkey: '', sessiontoken: ''})
    })
    .catch(e=> console.log(e))
  };
  return (
    <>
    <NavbarDash username={username} setClusterName={setClusterName} setCluster={setCluster} setNodes={setNodes}/>
    <div className="entirepage">
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Add Your EKS Cluster</h1>
        <div className="formGroup">
          <input type="text" id="username" placeholder="Access Key ID" name="accesskey" onChange={handleUserInput} />
        </div>
        <div className="formGroup">
          <input type="text" id="password" placeholder="Secret Access Key" name="secretkey" onChange={handleUserInput} />
        </div>
        <div className="formGroup">
          <input type="text" id="password" placeholder="Session Token" name="sessiontoken" onChange={handleUserInput} />
        </div>
        <div className="formGroup">
          <input type="text" id="password" placeholder="Region" name="region" onChange={handleUserInput} />
        </div>
        <div className="submit">
          <button onClick={addCredentials}>Submit</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
