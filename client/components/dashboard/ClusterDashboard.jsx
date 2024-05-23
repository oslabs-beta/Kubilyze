import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar.jsx';
import {SmallWidget} from './widgets/SmallWidget.jsx';
import NavbarDash from "../NavbarDash.jsx";


export default function ClusterDashboard({
    clusterName,  
    clusterStatus,      
    clusterVersion,
    clusterDate,
    nodeNumber
  })   {
  //routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/nodedashboard");
  };

  //node array
  const nodes = Array.from({length: nodeNumber}, (_, i) => i + 1)
  console.log(nodes)
 

  //rendered elements to be returned
  return (
    <>
    <NavbarDash/>
      <div id="page">
        <SideBar/>

        <div id='cluster-dashboard' className="dashboard">

          <div className="dashboard-title">
            <h1>Dashboard</h1> 
            <h3>Cluster Name:  {"  "+ clusterName}</h3>           
          </div>
          

          <div className="widget-container">         
              <SmallWidget type={'Status'} metric={clusterStatus}/>
              <SmallWidget type={'Created'}  metric={clusterDate}/>
              <SmallWidget type={'Version'}  metric={clusterVersion}/>          
          </div>
          <div  className="nodes-div">
          <h2>Cluster Nodes</h2>
            <div className="node-container">
                {nodes.map((button, index) => (
                  <button key={index} className="node-circle" onClick={handleLoginClick}>
                  Node{" "+ (index+1)}
                  </button> 
                ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
