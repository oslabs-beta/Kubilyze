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
  const [username, setUsername] = useState('');
  //State related to Clusters
  const [clusterName, setClusterName] = useState("");
  const [cluster, setCluster] = useState([]);
  //State related to Nodes
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(0);
  const [nodeData, setNodeData] = useState(''); 
  //State related to Pods
  const [pods, setPods] = useState([]);
  const [selectedPod, setSelectedPod] = useState(0);
  const [podData, setPodData] = useState(''); 

  //Returning all of our routes for our application
  //At each route rendering components 
  //At each component passing down state as props
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm setUsername={setUsername}/>} />
        <Route path="/signup" element={<SignUp  setUsername={setUsername}/>} />
        <Route path="/addcluster" element={<AddCluster username={username} setClusterName={setClusterName} setCluster={setCluster} setNodes={setNodes}/>} />
        <Route
          path="/selectcluster"
          element={
            <ClusterCircle
              username={username}
              clusterName={clusterName}
              setClusterName={setClusterName}
              setCluster={setCluster}
              setNodes={setNodes}
            />
          }
        />
        <Route
          path="/clusterdashboard"
          element={
            <ClusterDashboard
              username={username}
              clusterName={clusterName}
              setClusterName={setClusterName} 
              cluster={cluster}
              setCluster={setCluster} 
              nodes={nodes}
              setNodes={setNodes}
              setSelectedNode={setSelectedNode}
              setNodeData={setNodeData}        
              setPods={setPods}              
            />
          }
        />
        <Route
          path="/nodedashboard"
          element={
            <NodeDashboard
              username={username}
              clusterName={clusterName}
              nodes={nodes}
              setClusterName={setClusterName} 
              setCluster={setCluster} 
              setNodes={setNodes}
              selectedNode={selectedNode}
              nodeData={nodeData}
              pods={pods}
              setSelectedPod={setSelectedPod}
              setPodData={setPodData}   
            />
          }
        />
        <Route
          path="/poddashboard"
          element={
            <PodDashboard
              username={username}
              clusterName={clusterName}
              setClusterName={setClusterName} 
              setCluster={setCluster} 
              nodes={nodes}
              setNodes={setNodes}
              selectedNode={selectedNode}
              pods={pods}
              selectedPod={selectedPod}
              podData={podData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

