import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const ClusterCircle = ({clusterName,  
  setClusterName,
  clusterStatus,      
  setClusterStatus,
  clusterVersion,
  setClusterVersion, 
  clusterDate,
  setClusterDate}) => {
  const navigate = useNavigate();
  useEffect( () => {
    fetch('http://localhost:3000/api/clusters', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      setClusterName(data[0].name);
      setClusterStatus(data[0].status);
      setClusterVersion(data[0].version);
      setClusterDate(data[0].createdAt);    
    })
    .catch(err => console.log("err:", err))
  }, [])

  const handleLoginClick = () => {
    navigate("/clusterdashboard");
  };

  return (
    <>
      <div id="cluster-area">     
      <button id="cluster-circle" className="circle" onClick={handleLoginClick}>
        {clusterName}
      </button> 
      </div>          
    </>
  );
};


