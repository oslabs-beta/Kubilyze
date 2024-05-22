import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar.jsx';



export default function ClusterDashboard({clusterName,  
  clusterStatus,      
  clusterVersion,
  clusterDate} ) {
  const navigate = useNavigate();
  const handleLoginClick = () => {
  navigate("/nodedashboard");
};
  return (
    <>
      <div id="page">
        <SideBar/>
        <div id='cluster-dashboard' className="dashboard">
          <h1>This is your Cluster dashboard</h1>
          <div>
          {clusterName} {clusterStatus} {clusterVersion} {clusterDate}
          </div>
          <button id="cluster-circle" className="circle" onClick={handleLoginClick}>
            node1
          </button> 
        </div>
      </div>
    </>
  );
}
