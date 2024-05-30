import React, { useState } from "react";
import Home from "./components/Home.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp.jsx";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import AddCluster from "./components/AddCluster.jsx";
import { ClusterCircle } from "./components/ClusterCircle.jsx";
import ClusterDashboard from "./components/dashboard/ClusterDashboard.jsx";
import NodeDashboard from "./components/dashboard/NodeDashboard.jsx";
import PodDashboard from "./components/dashboard/PodDashboard.jsx";

//
const App = () => {
  //->To DO: remove hard coded data when fetch requests are properly working
  const [clusterName, setClusterName] = useState("first-cluster");
  const [clusterStatus, setClusterStatus] = useState("ACTIVE");
  const [clusterVersion, setClusterVersion] = useState("1.29");
  const [clusterDate, setClusterDate] = useState("2024-05-16T01:12:14.143Z");
  const [selectedNode, setSelectedNode] = useState(0);
  const [selectedPod, setSelectedPod] = useState(0);
  const [username, setUsername] = useState('')
  const [nodes, setNodes] = useState([
    {
      instanceId: "i-0b0deb6bb775b06c7",
      name: "ip-192-168-56-043.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-09d10f65bb4092a9f",
      name: "ip-192-168-234-789.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-0b0deb6bb775b06c7",
      name: "ip-192-168-546-12.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-09d10f65bb4092a9f",
      name: "ip-192-168-93-457.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-0b0deb6bb775b06c7",
      name: "ip-192-168-394-581.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-09d10f65bb4092a9f",
      name: "ip-192-168-024-12.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-0b0deb6bb775b06c7",
      name: "ip-192-168-81-91.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-09d10f65bb4092a9f",
      name: "ip-192-246-13-34.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-0b0deb6bb775b06c7",
      name: "ip-192-168-67-047.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
    {
      instanceId: "i-09d10f65bb4092a9f",
      name: "ip-192-168-91-845.ec2.internal",
      state: "running",
      launchTime: "2024-05-16T01:25:04.000Z",
    },
  ]);
  const [pods, setPods] = useState([
    {
        "instanceId": "i-0b0deb6bb775b068j",
        "name": "ip-192-168-38-71.ec2.internal",
        "state": "running",
        "launchTime": "2024-05-16T01:25:04.000Z"
    },
    {
        "instanceId": "i-09d10f65bb4092a1t",
        "name": "ip-192-168-13-219.ec2.internal",
        "state": "running",
        "launchTime": "2024-05-16T01:25:04.000Z"
    },
      {
        "instanceId": "i-09d10f65bb4092a15",
        "name": "ip-192-168-13-219.ec2.internal",
        "state": "running",
        "launchTime": "2024-05-16T01:25:04.000Z"
    },
    {
      "instanceId": "i-0b0deb6bb775b0681",
      "name": "ip-192-168-38-71.ec2.internal",
      "state": "running",
      "launchTime": "2024-05-16T01:25:04.000Z"
  },
  {
      "instanceId": "i-09d10f65bb4092a8j",
      "name": "ip-192-168-13-219.ec2.internal",
      "state": "running",
      "launchTime": "2024-05-16T01:25:04.000Z"
  },
    {
      "instanceId": "i-09d10f65bb4092a4w",
      "name": "ip-192-168-13-219.ec2.internal",
      "state": "running",
      "launchTime": "2024-05-16T01:25:04.000Z"
  },
  {
    "instanceId": "i-09d10f65bb4092a3f",
    "name": "ip-192-168-13-219.ec2.internal",
    "state": "running",
    "launchTime": "2024-05-16T01:25:04.000Z"
  }
  
  ]);
  console.log(username)

  //Returning all of our routes for our application
  //At each route rendering components 
  //At each component passing down state as props
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm setUsername={setUsername}/>} />
        <Route path="/signup" element={<SignUp  setUsername={setUsername}/>} />
        <Route path="/addcluster" element={<AddCluster username={username} />} />
        <Route
          path="/selectcluster"
          element={
            <ClusterCircle
              clusterName={clusterName}
              setClusterName={setClusterName}
              setClusterStatus={setClusterStatus}
              setClusterVersion={setClusterVersion}
              setClusterDate={setClusterDate}
              setNodes={setNodes}
              username={username}
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
              nodes={nodes}
              setSelectedNode={setSelectedNode}       
              setPods={setPods} 
              username={username}
            />
          }
        />
        <Route
          path="/nodedashboard"
          element={
            <NodeDashboard
              clusterName={clusterName}
              nodes={nodes}
              selectedNode={selectedNode}
              pods={pods}
              setPods={setPods}
              setSelectedPod={setSelectedPod}
              username={username}
            />
          }
        />
        <Route
          path="/poddashboard"
          element={
            <PodDashboard
              clusterName={clusterName}
              pods={pods}
              nodes={nodes}
              selectedNode={selectedNode}
              selectedPod={selectedPod}
              username={username}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
