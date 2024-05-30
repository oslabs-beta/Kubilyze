import React, { useState } from "react";
import {Graphs} from './widgets/Graphs.jsx';
import SideBarPods2 from './SideBarPods2.jsx';
import NavbarDash from "../NavbarDash.jsx";
import {SmallWidget} from './widgets/SmallWidget.jsx';

export default function PodDashboard({pods, selectedPod, selectedNode, clusterName, nodes}) {
  // console.log("pods"+ pods);
  //rendered elements to be returned
  return (
    <>
      <NavbarDash/>
        <div id="page">
          <SideBarPods2/>

          <div id='cluster-dashboard' className="dashboard">

            <div className="dashboard-title">
              <h1>Dashboard</h1> 
              <h4>Cluster:  {"  "+ clusterName}</h4> 
              <h4>Node:  {"  "+ nodes[selectedNode].name}</h4>
              <h4 style={{ color: 'grey'}} >Pod:  {"  "+ pods[selectedNode].name}</h4>                        
            </div>

            <div id="graph-area">
              <Graphs level={"pod"}/>           
            </div>

            <div className="widget-container">         
            <SmallWidget type={'Status'} metric={pods[selectedNode].state}/>
                <SmallWidget type={'Created'}  metric={pods[selectedNode].launchTime}/>
                <SmallWidget type={'Instance'}  metric={pods[selectedNode].instanceId}/> 
            </div>
          </div>
        </div>  
    </>
  );
}