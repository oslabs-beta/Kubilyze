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
            <a href="/nodedashboard">Node 3</a>
            <a href="/nodedashboard">Node 4</a>
            <a href="/nodedashboard">Node 5</a>
            <a href="/nodedashboard">Node 6</a>
            <a href="/nodedashboard">Node 7</a>
            <a href="/nodedashboard">Node 8</a>
            <a href="/nodedashboard">Node 9</a>
            <a href="/nodedashboard">Node 10</a>
          </div>
        </div>
      </div>
    </div>
  );
}
