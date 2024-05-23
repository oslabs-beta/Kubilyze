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
    setSelectedNode
  })   {

  //routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = (index) => {
    setSelectedNode(index);
    navigate("/nodedashboard");
  };

  //node array
  const nodeNums = Array.from({length: nodes.length}, (_, i) => i + 1)
  // console.log(nodes)
 
  //rendered elements to be returned
  return (
    <>
    <NavbarDash />
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
