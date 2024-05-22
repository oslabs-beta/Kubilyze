import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles.css";
import {Graphs} from './widgets/Graphs.jsx';

export default function ClusterDashboard() {
  return (
    <div id='cluster-dashboard' className="dashboard">
      <h1>This is your Pod dashboard</h1>
       <div id="graph-area">
              <Graphs/>           
        </div>
    </div>
  );
}
