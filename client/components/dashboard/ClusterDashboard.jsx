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
    nodes,
    setSelectedNode,    
    setPods, 
    username,
    setNodeData,
    nodeData
  }) {

  //Routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = (index) => {
    setSelectedNode(index);
    navigate("/nodedashboard");

  //->To DO: uncomment when fetch request can be made per specific node
   //Upon click fetch node metrics and get number of pods
      fetch("http://localhost:3000/api/metrics/first-cluster/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNodeData(data);
          // console.log(nodeData);
          console.log(data);
        })
        .catch((err) => console.log("err:", err));    
  };

  //Node array to map from
  const nodeNums = Array.from({length: nodes.length}, (_, i) => i + 1)
 
  //Rendered elements to be returned
  return (
    <>
    <NavbarDash username={username}/>
      <div id="page">
        <SideBar clusterName={clusterName}/>
        <div id='cluster-dashboard' className="dashboard">
          <div className="dashboard-title">
            <h1>Cluster Dashboard</h1> 
            <h4 style={{ color: 'grey'}}>{"  "+ clusterName}</h4>                     
          </div>          
          <div className="widget-container">         
              <SmallWidget type={'Status:'} metric={clusterStatus}/>
              <SmallWidget type={'Created:'}  metric={clusterDate}/>
              <SmallWidget type={'Version:'}  metric={clusterVersion}/>          
          </div>
          <div  className="nodes-div">
            <h2>Cluster Nodes</h2>
            <div className="node-container">
              {nodeNums.map((button, index) => (
                <button key={index} className="node-circle" onClick={()=>handleLoginClick(index)}>
                  <h2>Node{" "+ (index+1)}</h2>
                  <h6>{nodes[index].name}</h6>               
                </button> 
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
