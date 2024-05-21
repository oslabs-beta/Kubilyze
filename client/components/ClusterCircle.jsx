import React, { useState } from 'react';




export const ClusterCircle = () => {

  const [clusterName, setClusterName] = useState('');
  fetch('http://localhost:3000/api/clusters', {
    mode: 'no-cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }})
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log("err:", err))


  return (
    <>       
              {/* <div id="cluster-circle" className="circle"> */}
              <button id="cluster-circle" className="circle">
                {clusterName}
              </button>
              {/* </div> */} 
           
    </>
  );
};


