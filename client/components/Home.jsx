import React from "react";
import Navbar from "./Navbar.jsx";


export default function Home() {
  return (
    <>
    <Navbar/>
    <div id="homepage">
      <div className="fullLogo">
          <img src={require("./background.png")} alt="Logo" />
        </div>
        <h2 className="tagline"> Cluster observability with ease</h2>
    </div>
    </>
  );
}
