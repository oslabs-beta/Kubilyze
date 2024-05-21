import React from "react";
import Navbar from "./components/Navbar.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddCluster from "./components/AddCluster.jsx";

const App = () => {
  return (
    // <LoginForm />
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="addcluster" element={<AddCluster />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
