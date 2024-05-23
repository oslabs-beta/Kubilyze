import React, { useState } from "react";
// import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp.jsx";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import AddCluster from "./components/AddCluster.jsx";
import { ClusterCircle } from "./components/ClusterCircle.jsx";
import ClusterDashboard from "./components/dashboard/ClusterDashboard.jsx";
import NodeDashboard from "./components/dashboard/NodeDashboard.jsx";
import PodDashboard from "./components/dashboard/PodDashboard.jsx";

const App = () => {
  const [clusterName, setClusterName] = useState("unknown");
  const [clusterStatus, setClusterStatus] = useState("unknown");
  const [clusterVersion, setClusterVersion] = useState("unknown");
  const [clusterDate, setClusterDate] = useState("unknown");
  const [nodeNumber, setnodeNumber] = useState(15);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addcluster" element={<AddCluster />} />
        <Route
          path="/selectcluster"
          element={
            <ClusterCircle
              clusterName={clusterName}
              setClusterName={setClusterName}
              setClusterStatus={setClusterStatus}
              setClusterVersion={setClusterVersion}
              setClusterDate={setClusterDate}
              setnodeNumber={setnodeNumber}
            />
          }
        />
        <Route
          path="/clusterdashboard"
          element={
            <ClusterDashboard
              clusterName={clusterName}
              clusterStatus={clusterStatus}
              clusterVersion={clusterVersion}
              clusterDate={clusterDate}
              nodeNumber={nodeNumber}
            />
          }
        />
        <Route path="/nodedashboard" element={<NodeDashboard />} />
        <Route path="/poddashboard" element={<PodDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
