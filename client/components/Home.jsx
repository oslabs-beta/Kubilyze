import React from "react";
import Navbar from "./Navbar.jsx";

export default function Home() {
  //Returning homepage background image
  return (
    <>
      <Navbar/>
      <div id="homepage">
        <div className="fullLogo">
          <img src={require("./background.png")} alt="Logo" />
        </div>
      </div>
    </>
  );
}
