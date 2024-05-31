import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar.jsx';
import {SmallWidget} from './widgets/SmallWidget.jsx';
import NavbarDash from "../NavbarDash.jsx";

export default function ClusterDashboard({
    username,
    clusterName, 
    clusters,
    nodes,
    setSelectedNode,    
    setNodeData, 
    setPods,   
  }) {

  //Routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = (index) => {
    setSelectedNode(index);
    
    //->ToDo: backend edit api request to get podData
    //Upon click, fetch nodeData for graphs and pod identities for rendering on next page, NodeDashboard
      fetch(`http://localhost:3000/api/metrics/${clusterName}/${nodes[index].instanceId}/${nodes[index].name}`, {
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
          navigate("/nodedashboard");
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
              <SmallWidget type={'Status:'} metric={clusters[0].status}/>
              <SmallWidget type={'Created:'}  metric={clusters[0].createdAt}/>
              <SmallWidget type={'Version:'}  metric={clusters[0].version}/>    
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
