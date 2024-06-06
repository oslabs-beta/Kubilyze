import React from "react";
import { useNavigate} from "react-router-dom";

export default function SideBar({ clusterName }) {
  const navigate = useNavigate()
  return (
    <div className="sidebar">
      <div className="sidebarMenu">
       <p onClick={()=> navigate('/selectcluster')}>{clusterName}</p>
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
