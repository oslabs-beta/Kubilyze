import React from "react";
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
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addcluster" element={<AddCluster />} />
        <Route path="/selectcluster" element={<ClusterCircle/>} />   
        <Route path="/clusterdashboard" element={<ClusterDashboard />} />
        <Route path="/nodedashboard" element={<NodeDashboard />} />  
        <Route path="/poddashboard" element={<PodDashboard />} />          
      </Routes>  
    </BrowserRouter>
  );
};

export default App;
