import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";


export const ClusterCircle = ({
  clusterName,
  setClusterName,
  setClusterStatus,
  setClusterVersion,
  setClusterDate,
  setNodeNumber,
}) => {
  //routing upon button click
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/clusterdashboard");
  };

  //fetch request to server for cluster metrics
  useEffect(() => {
    fetch("http://localhost:3000/api/clusters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setClusterName(data[0].name);
        setClusterStatus(data[0].status);
        setClusterVersion(data[0].version);
        setClusterDate(data[0].createdAt);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  //rendered elements to be returned
  return (
    <>
    <NavbarDash/>
      <div id="cluster-area">
        <button
          
          className="cluster-circle"
          onClick={handleLoginClick}
        >
          {clusterName}
        </button>
      </div>
    </>
  );
};
