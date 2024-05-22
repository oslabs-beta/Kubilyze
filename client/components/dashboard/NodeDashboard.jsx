import React, { useState } from "react";
import {Graphs} from './widgets/Graphs.jsx';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar.jsx';

export default function ClusterDashboard() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/poddashboard");
  };
  return (
    <div id="page">
      <SideBar/>
      <div id='cluster-dashboard' className="dashboard">
        <h1>This is your Node dashboard</h1>
        <div id="graph-area">
            <Graphs/>           
          </div>
        <button id="cluster-circle" className="circle" onClick={handleLoginClick}>
          pod1
        </button> 
      </div>
    </div>
  );
}
