import React, { useState } from "react";
import {Graphs} from './widgets/Graphs.jsx';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar.jsx';
import NavbarDash from "../NavbarDash.jsx";
import {SmallWidget} from './widgets/SmallWidget.jsx';


export default function ClusterDashboard({clusterName, nodes, selectedNode, pods, setPods, setSelectedPod}) {
  //routing upon button click  
  const navigate = useNavigate();
  const handleLoginClick = (index) => {
    setSelectedPod(index);
    navigate("/poddashboard");
  };

  //upon render of page fetch node metrics and set pods
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/clusters", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPods(data.clusters[0].name);
  //     })
  //     .catch((err) => console.log("err:", err));
  // }, []);


  //pod array
  const podNums = Array.from({length: pods.length}, (_, i) => i + 1)
  
  //rendered elements to be returned
  return (
    <>
      <NavbarDash/>
        <div id="page">
          <SideBar/>

          <div id='cluster-dashboard' className="dashboard">

            <div className="dashboard-title">
              <h1>Dashboard</h1> 
              <h4>Cluster:  {"  "+ clusterName}</h4> 
              <h4 style={{ color: 'black'}} >Node:  {"  "+ nodes[selectedNode].name}</h4>                     
            </div>

            <div id="graph-area">
              <Graphs/>           
            </div>

            <div className="widget-container">         
                <SmallWidget type={'Status'} metric={nodes[selectedNode].state}/>
                <SmallWidget type={'Created'}  metric={nodes[selectedNode].launchTime}/>
                <SmallWidget type={'Instance'}  metric={nodes[selectedNode].instanceId}/>      
            </div>

            <div  className="nodes-div">
              <h2>Node Pods</h2>
              <div className="node-container">
                  {podNums.map((button, index) => (
                    <button key={index} className="node-circle" onClick={()=>handleLoginClick(index)}>
                      <h2>Pod{" "+ (index+1)}</h2>
                      {/* <h6>{pods[index]}</h6> */}                
                    </button> 
                  ))}
              </div>
            </div>

          </div>
        </div>  
    </>
  );
}
