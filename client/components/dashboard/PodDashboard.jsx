import React, { useState } from "react";
import {Graphs} from './widgets/Graphs.jsx';
import SideBar from './SideBar.jsx';

export default function ClusterDashboard() {
  return (
    <div id="page">
    <SideBar/>
      <div id='cluster-dashboard' className="dashboard">
        <h1>This is your Pod dashboard</h1>
        <div id="graph-area">
                <Graphs/>           
          </div>
      </div>
    </div>
  );
}
