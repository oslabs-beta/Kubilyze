import React, { useState} from "react";
import Navbar from "./components/Navbar.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp.jsx";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import AddCluster from "./components/AddCluster.jsx";
import {ClusterCircle} from "./components/ClusterCircle.jsx";
import ClusterDashboard from "./components/dashboard/ClusterDashboard.jsx";
import NodeDashboard from "./components/dashboard/NodeDashboard.jsx";
import PodDashboard from "./components/dashboard/PodDashboard.jsx";

const App = () => {
  const [clusterName, setClusterName] = useState('');
  const [clusterStatus, setClusterStatus] = useState('');
  const [clusterVersion, setClusterVersion] = useState('');
  const [clusterDate, setClusterDate] = useState('');


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addcluster" element={<AddCluster />} />
        <Route path="/selectcluster" element={<ClusterCircle
          clusterName={clusterName}  
          setClusterName={setClusterName}
          clusterStatus={clusterStatus}      
          setClusterStatus={setClusterStatus} 
          clusterVersion={clusterVersion} 
          setClusterVersion={setClusterVersion} 
          clusterDate={clusterDate}
          setClusterDate={setClusterDate}/>} />   
        <Route path="/clusterdashboard" element={<ClusterDashboard 
          clusterName={clusterName}  
          clusterStatus={clusterStatus}      
          clusterVersion={clusterVersion} 
          clusterDate={clusterDate}
          />} />
        <Route path="/nodedashboard" element={<NodeDashboard />} />  
        <Route path="/poddashboard" element={<PodDashboard />} />          
      </Routes>  
    </BrowserRouter>
  );
};




export default App;
