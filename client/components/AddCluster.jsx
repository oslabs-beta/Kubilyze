import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDash from "./NavbarDash.jsx";

export default function AddCluster({
  username,
  setClusterName,
  setCluster,
  setNodes,
}) {
  const [accessInfo, setAccessInfo] = useState({
    accesskey: "",
    secretkey: "",
    sessiontoken: "",
    region: "",
  });
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleUserInput = (e) => {
    setAccessInfo({ ...accessInfo, [e.target.name]: e.target.value });
  };

  const addCredentials = () => {
    fetch("http://localhost:3000/user/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...accessInfo, username }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        console.log("an error happened in the server");
      })
      .then((user) => {
        if (user) {
          console.log(user);
          navigate("/selectcluster");
        }
        setAccessInfo({ accesskey: "", secretkey: "", sessiontoken: "" });
      })
      .catch((e) => console.log(e));
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <NavbarDash
        username={username}
        setClusterName={setClusterName}
        setCluster={setCluster}
        setNodes={setNodes}
      />
      <div className="entirepage">
        <div className="loginContainer">
          <div id="loginform">
            <h1 className="title">Add Your EKS Cluster</h1>
            <div className="formGroup">
              <input
                type="text"
                id="accessKeyId"
                placeholder="Access Key ID"
                name="accessKeyId"
                onChange={handleUserInput}
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                id="secretAccessKey"
                placeholder="Secret Access Key"
                name="secretAccessKey"
                onChange={handleUserInput}
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                id="sessionToken"
                placeholder="Session Token"
                name="sessionToken"
                onChange={handleUserInput}
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                id="region"
                placeholder="Region"
                name="region"
                onChange={handleUserInput}
              />
            </div>

            <div className="readMore">
              <button onClick={toggleModal}>Where do I find this info?</button>
            </div>
            <div className="submit">
              <button onClick={addCredentials}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeButton" onClick={toggleModal}>
              &times;
            </span>
            <h2>How to add your EKS Clusters </h2>

            <br></br>
            <p>
              Please make sure to follow the steps of the ReadMe closely. You
              can find the ReadMe linked in the Docs on the homepage.
            </p>
            <br></br>
            <p>
              Make sure to create a role in your AWS account and have an IAM
              user assume that role so that you're inputting those temporary
              creditionals into the app.
            </p>
            <br></br>
            <p>
              Please note that the credentials have a default time limit of 1
              hour unless you indicate otherwise. Your credentials will expire
              after that duration and you will need to regenerate tokens.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavbarDash from "./NavbarDash.jsx";

// // import { useNavigate } from "react-router-dom";
// // import "../styles.css";

// export default function AddCluster({username}) {
//   const navigate = useNavigate();
//   const handleLoginClick = () => {
//     navigate("/selectcluster");
//   };
//   return (
//     <>
//     <NavbarDash username={username}/>
//     <div className="entirepage">
//     <div className="loginContainer">
//       <div id="loginform">
//         <h1 className="title">Add Your EKS Cluster</h1>
//         <div className="formGroup">
//           <input type="text" id="username" placeholder="Access Key ID" name="username" />
//         </div>
//         <div className="formGroup">
//           <input type="text" id="password" placeholder="Secret Access Key" name="password" />
//         </div>
//         <div className="formGroup">
//           <input type="text" id="password" placeholder="Session Token" name="password" />
//         </div>
//         <div className="formGroup">
//           <input type="text" id="password" placeholder="Region" name="Region" />
//         </div>
//         <div className="submit">
//           <button onClick={handleLoginClick}>Submit</button>
//         </div>
//       </div>
//     </div>
//     </div>
//     </>
//   );
// }
