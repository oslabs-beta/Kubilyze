import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar.jsx';
import {SmallWidget} from './widgets/SmallWidget.jsx';
import NavbarDash from "../NavbarDash.jsx";

export default function ClusterDashboard({
    username,
    clusterName, 
    cluster,
    nodes,
    setCluster,
    setClusterName,
    setNodes,
    setSelectedNode,    
    setNodeData, 
    setPods,   
  }) {

    const podGenerator = (num) => {
      const arr =[];
      for( let i =0; i < num; i++){
        arr.push({
          name: " "
        })
      }
      return arr;
    };

  //Routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = (index) => {
    setSelectedNode(index);
    
    //->ToDo: backend edit api request to get podData
    //Upon click, fetch nodeData for graphs and pod identities for rendering on next page, NodeDashboard
      fetch(`https://kubilyze-32a4b0d50531.herokuapp.com/api/metrics/${clusterName}/${nodes[index].instanceId}/${nodes[index].name}/${cluster[0].createdAt}`, {
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
          setNodeData(data);
          setPods(podGenerator(data[2].Values[0]));  
          navigate("/nodedashboard");     
        })
        .catch((err) => console.log("err:", err));    
  };

  //Node array to map from
  const nodeNums = Array.from({length: nodes.length}, (_, i) => i + 1)
 
  //Rendered elements to be returned
  return (
    <>
    <NavbarDash username={username} setCluster={setCluster} setClusterName={setClusterName} setNodes={setNodes}/>
      <div id="page">
        <SideBar clusterName={clusterName}/>
        <div id='cluster-dashboard' className="dashboard">
          <div className="dashboard-title">
            <h1>Cluster Dashboard</h1> 
            <h4 style={{ color: 'black'}}> Cluster 1:  {"  "+ clusterName}</h4>      
          </div>          
          <div className="widget-container">         
              <SmallWidget type={'Status:'} metric={cluster[0].status}/>
              <SmallWidget type={'Created:'}  metric={cluster[0].createdAt}/>
              <SmallWidget type={'Version:'}  metric={cluster[0].version}/>    
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
