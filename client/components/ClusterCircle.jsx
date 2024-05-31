import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";

export const ClusterCircle = ({
  username,
  clusterName,
  setClusterName,
  setClusters,
  setSelectedCluster,
  setNodes,
}) => {
  //Routing upon button click
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/clusterdashboard");
  };
  
  //Upon full page load, fetch cluster info and node identities for rendering on next page, PodDashboard
  useEffect(() => {
    fetch("http://localhost:3000/api/clusters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClusterName(data.clusters[0].name);
    
        setClusters(data.clusters);
        setNodes(data.nodes[0].nodes);       
      })
      .catch((err) => console.log("err:", err));
  }, []);

  //rendered elements to be returned
  return (
    <>
      <NavbarDash username={username}/>
      <h3 className="clustit">Select your cluster below to view your metrics dashboard</h3>
      <div id="cluster-area">
        <button className="cluster-circle" onClick={handleLoginClick}>
          <h2>Cluster 1</h2>
          <h4>{clusterName}</h4>          
        </button>
      </div>

    </>
  );
};
