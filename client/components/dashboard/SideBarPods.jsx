import React from "react";

export default function SideBarPods({ clusterName }) {
  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        <a href="/selectcluster">Cluster {clusterName}</a>
        <a href="/nodedashboard">Node 2</a>
        <div className="dropdown">
          <button className="dropbtn">
            Select Pod
            <i className="fa fa-caret-down" style={{ marginLeft: "5px" }}></i>
          </button>
          <div className="dropdown-content">
            <a href="/poddashboard">Pod 1</a>
            <a href="/poddashboard">Pod 2</a>
            <a href="/poddashboard">Pod 3</a>
            <a href="/poddashboard">Pod 4</a>
            <a href="/poddashboard">Pod 5</a>
            <a href="/poddashboard">Pod 6</a>
            <a href="/poddashboard">Pod 7</a>
          </div>
        </div>
      </div>
    </div>
  );
}
