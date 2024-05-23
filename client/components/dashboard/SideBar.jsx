import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar({ clusterName, nodeNumber }) {
  const navigate = useNavigate();
  const handleLoginClick = (nodeIndex) => {
    navigate("/nodedashboard");
  };

  const nodes = Array.from({ length: nodeNumber }, (_, i) => i + 1);

  return (
    <div className="sidebar">
      <div class="sidebarMenu">
        <a href="/">Cluster {"  " + clusterName}</a>
        {/* <a href="#news">Node</a> */}
        <div class="dropdown">
          <button class="dropbtn">
            Select Node
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="/">Node 1</a>
            <a href="/">Node 2</a>
            <a href="/">Node 3</a>
            {/* {nodes.map((node, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => handleNodeClick(node)}
              >
                Node {node}
              </button>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
