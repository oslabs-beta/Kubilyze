import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
// const handleLoginClick = () => {
//   navigate("/nodedashboard");
// };

export default function ClusterDashboard() {
  return (
    <div id='cluster-dashboard' className="dashboard">
      <h1>This is your Cluster dashboard</h1>
      {/* <button id="cluster-circle" className="circle" onClick={handleLoginClick}>
        node
      </button>  */}
    </div>
  );
}
