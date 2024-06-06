import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function SideBarPods({ clusterName, nodeNumber }) {
  // const navigate = useNavigate();
  // const handleLoginClick = (nodeIndex) => {
  //   navigate("/nodedashboard");
  // };

  // const nodes = Array.from({ length: nodeNumber }, (_, i) => i + 1);

  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        <a href="/selectcluster">Cluster first-cluster</a>
        <a href="/nodedashboard">Node</a>
        <div className="dropdown">
          <div className="dropdown-content">
            {/* <a href="/">Node 2</a> */}
            <a href="/nodedashboard">Node 1</a>
            <a href="/nodedashboard">Node 2</a>
          </div>
          <button className="dropbtn">
            Pod Overview
            <i className="fa fa-caret-down" style={{ marginLeft: "5px" }}></i>
          </button>
          <div className="dropdown-content">
            {/* <a href="/">Node 2</a> */}
            <a href="/poddashboard">Pod 1</a>
            <a href="/poddashboard">Pod 2</a>
            <a href="/poddashboard">Pod 3</a>
            <a href="/poddashboard">Pod 4</a>
            <a href="/poddashboard">Pod 5</a>
            <a href="/poddashboard">Pod 6</a>
            <a href="/poddashboard">Pod 7</a>
            <a href="/poddashboard">Pod 8</a>

          </div>
        </div>
      </div>
    </div>
  );
}
