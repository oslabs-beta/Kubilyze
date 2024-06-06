import React from "react";

export default function SideBar({ clusterName }) {
  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        <a href="/selectcluster">Cluster {clusterName}</a>
        <div className="dropdown">
          <button className="dropbtn">
            Select Node
            <i className="fa fa-caret-down" style={{ marginLeft: "5px" }}></i>
          </button>
          <div className="dropdown-content">
            <a href="/nodedashboard">Node 1</a>
            <a href="/nodedashboard">Node 2</a>

          </div>
        </div>
      </div>
    </div>
  );
}
