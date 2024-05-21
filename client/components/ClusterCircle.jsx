import React, { useState, useEffect } from 'react';

export const ClusterCircle = () => {
  const [clusterName, setClusterName] = useState('');
  const [clusterStatus, setClusterStatus] = useState('');
  const [clusterVersion, setClusterVersion] = useState('');
  const [clusterDate, setClusterDate] = useState('');

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

  return (
    <>     
      <button id="cluster-circle" className="circle">
        {clusterName}
      </button>           
    </>
  );
};


