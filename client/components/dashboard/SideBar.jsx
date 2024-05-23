import React, { useState } from "react";

export default function SideBar() {
    return (
    <div className="sidebar">
      <div class="sidebarMenu">        
        <a href="#home">Cluster</a>
        <a href="#news">Node</a>
        <div class="dropdown">
          <button class="dropbtn">
            Select Pod
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Pod 1</a>
            <a href="#">Pod 2</a>
            <a href="#">Pod 3</a>
          </div>
        </div>
      </div>
    </div>
  );
}
