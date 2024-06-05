import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";

export const ClusterCircle = ({
  username,
  clusterName,
  setClusterName,
  setCluster,
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username})
    })
      .then((res) => {
        if(res.ok) return res.json();
      })
      .then((data) => {
        if(data) {
        setClusterName(data.clusters[0].name);    
        setCluster(data.clusters);
        setNodes(data.nodes[0].nodes);      
        }
        else {
          navigate('/addcluster')
          alert('Credentials Expired, Please Re-enter')
        }             
      })
      .catch((err) => console.log("err:", err));
  }, []);


  //Rendered elements to be returned
  return (
    <>
      <NavbarDash username={username} setClusterName={setClusterName} setNodes={setNodes} setCluster={setCluster} />
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
