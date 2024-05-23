import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";

export const ClusterCircle = ({
  clusterName,
  setClusterName,
  setClusterStatus,
  setClusterVersion,
  setClusterDate,
  setNodes,
}) => {
  //routing upon button click
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/clusterdashboard");
  };

  //temporarily turn off fetching and hard code data in
  //fetch request to server for cluster metrics
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/clusters", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setClusterName(data.clusters[0].name);
  //       setClusterStatus(data.clusters[0].status);
  //       setClusterVersion(data.clusters[0].version);
  //       setClusterDate(data.clusters[0].createdAt);
  //       setNodes(data.nodes[0].nodes);

  //     })
  //     .catch((err) => console.log("err:", err));
  // }, []);

  //rendered elements to be returned
  return (
    <>
      <NavbarDash />
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
