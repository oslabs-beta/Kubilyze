import React, { useState } from "react";
import {Graphs} from './widgets/Graphs.jsx';
import SideBarPods2 from './SideBarPods2.jsx';
import NavbarDash from "../NavbarDash.jsx";
import {SmallWidget} from './widgets/SmallWidget.jsx';

export default function PodDashboard({
  username,
  clusterName,
  setClusterName,
  setCluster, 
  nodes,
  setNodes,
  selectedNode,
  pods,
  selectedPod, 
  podData
}) {
 
  //Rendered elements to be returned
  return (
    <>
      <NavbarDash username={username} setClusterName={setClusterName} setCluster={setCluster} setNodes={setNodes} />
        <div id="page">
          <SideBarPods2/>
          <div id='cluster-dashboard' className="dashboard">
            <div className="dashboard-title">
              <h1>Pod Dashboard</h1> 
              <h4>Cluster 1:  {"  "+ clusterName}</h4> 
              <h4>  Node  {(selectedNode + 1) + ":" + "  "+ nodes[selectedNode].name}</h4>
              <h4 style={{ color: 'black'}} >Pods  {"  "+ pods[selectedPod].name}</h4>                        
            </div>
            <div id="graph-area">
              <Graphs level={"pod"} results={podData}/>           
            </div>
            <div className="widget-container">         
            {/* <SmallWidget type={'Status'} metric={pods[selectedPod].state}/>
                <SmallWidget type={'Created'}  metric={pods[selectedPod].launchTime}/>
                <SmallWidget type={'Instance'}  metric={pods[selectedPod].instanceId}/>  */}
            </div>
          </div>
        </div>  
    </>
  );
}