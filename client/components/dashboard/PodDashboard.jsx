import React, { useState } from "react";
import {Graphs} from './widgets/Graphs.jsx';
import SideBar from './SideBar.jsx';
import NavbarDash from "../NavbarDash.jsx";
import {SmallWidget} from './widgets/SmallWidget.jsx';

export default function PodDashboard({pods, selectedPod, selectedNode, clusterName, nodes}) {
  console.log("pods"+ pods);
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
              <h4>Node:  {"  "+ nodes[selectedNode].name}</h4>
              <h4 style={{ color: 'black'}} >Pod:  {"  "}</h4>                        
            </div>

            <div id="graph-area">
              <Graphs/>           
            </div>

            <div className="widget-container">         
                <SmallWidget type={'Status'} metric={""}/>
                <SmallWidget type={'Created'}  metric={""}/>
                <SmallWidget type={'Instance'}  metric={""}/>      
            </div>
          </div>
        </div>  
    </>
  );
}