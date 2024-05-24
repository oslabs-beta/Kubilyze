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
      <div class="sidebarMenu">
        <a href="/selectcluster">Cluster first-cluster</a>
        <a href="/nodedashboard">Node 2</a>
        <div class="dropdown">
          <button class="dropbtn">
            Select Pod
            <i class="fa fa-caret-down" style={{ marginLeft: "5px" }}></i>
          </button>
          <div class="dropdown-content">
            {/* <a href="/">Node 2</a> */}
            <a href="/poddashboard">Pod 1</a>
            <a href="/poddashboard">Pod 2</a>
            <a href="/poddashboard">Pod 3</a>
            <a href="/poddashboard">Pod 4</a>
            <a href="/poddashboard">Pod 5</a>
            <a href="/poddashboard">Pod 6</a>
            <a href="/poddashboard">Pod 7</a>
            {/* {nodes.map((node, index) => (
              <a key={index} href="#" onClick={() => handleNodeClick(node)}>
                Node {node}
              </a>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
