import React, { useState, useEffect } from 'react';
import {Graphs} from './widgets/Graphs.jsx';
import { useNavigate } from "react-router-dom";
import SideBarPods from './SideBarPods.jsx';
import NavbarDash from "../NavbarDash.jsx";
import {SmallWidget} from './widgets/SmallWidget.jsx';

export default function NodeDashboard({
  username,
  clusterName, 
  nodes, 
  selectedNode,
  nodeData, 
  pods,
  setClusterName,
  setCluster,
  setNodes,  
  setSelectedPod, 
  setPodData
}) {
  //Routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = (index) => {
    setSelectedPod(index);
     //Upon click, fetch podData for graphs for rendering on next page, PodDashboard 
     fetch(`http://localhost:3000/api/metrics/${clusterName}/allpods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username})
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {       
        setPodData(data);
        navigate("/poddashboard");
      })
      .catch((err) => console.log("err:", err));
  };

  //Pod array to map from
  const podNums = Array.from({length: pods.length}, (_, i) => i + 1)

  //Rendered elements to be returned
  return (
    <>
      <NavbarDash username={username} setClusterName={setClusterName} setCluster={setCluster} setNodes={setNodes} />
        <div id="page">
          <SideBarPods/>
          <div id='node-dashboard' className="dashboard">
            <div className="dashboard-title">
              <h1>Node Dashboard</h1> 
              <h4>Cluster 1:  {"  "+ clusterName}</h4> 
              <h4 style={{ color: 'black'}}>  Node  {(selectedNode + 1) + ":" + "  "+ nodes[selectedNode].name}</h4>                     
            </div>
            <div id="graph-area">
              <Graphs level={"node"} results={nodeData}/>          
            </div>
            <div className="widget-container">         
                <SmallWidget type={'Status:'} metric={nodes[selectedNode].state}/>
                <SmallWidget type={'Created:'}  metric={nodes[selectedNode].launchTime}/>
                <SmallWidget type={'Instance:'}  metric={nodes[selectedNode].instanceId}/>      
            </div>
            <div  className="nodes-div">
              <h2>Node Pods</h2>
              <div className="node-container">
                  {podNums.map((button, index) => (
                    <button key={index} className="pod-circle" onClick={()=>handleLoginClick(index)}>
                      <h2>Pod{" "+ (index+1)}</h2>
                      <h6>{pods[index].name}</h6>            
                    </button> 
                  ))}
              </div>
            </div>
          </div>
        </div>  
    </>
  );
}
