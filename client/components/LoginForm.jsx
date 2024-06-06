import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./dashboard/SideBar.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function LoginForm({setUsername}) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({username: '', password: ''});

  // this handle function handles all input fileds.
  const handleUserInput = (e)=> {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }
  const handleLoginClick = () => {
    // console.log(userInput)
    fetch('https://kubilyze-32a4b0d50531.herokuapp.com/user/signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    .then(async (data)=> {
      //checking if response status is ok, if so continue to parse body of response object and return user
      if(data.ok) return data.json()
        // if response status is not ok, parse body of response for the error 'String' and alert
      // it to the screen
      const log = await data.json()
      console.log(log)
      alert(log)
    })
    .then((user)=> {
      // if user argument exist, then all previous checks passed and user from server 
      // is passed in and page navigates to '/selectcluster' page
      if(user) {
        setUsername(user.username)
        navigate('/selectcluster')
      }
      // restting the input fields 
     setUserInput({username: '', password: ''})
    })
  };

  return (
    <>
    <Navbar/>
    <div className='entirepage'>

    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Sign in to Kubilyze</h1>
        <div className="formGroup">
          {/* <label htmlFor="username">Username:</label> */}
          <input type="text" id="username" placeholder="Username" value={userInput.username} name="username" onChange={handleUserInput} />
        </div>
        <div className="formGroup">
          {/* <label htmlFor="password">Password:</label> */}
          <input type="password" id="password" placeholder="Password"value ={userInput.password} name="password" onChange={handleUserInput} />
        </div>
        <div className="submit">
          <button onClick={handleLoginClick}>Submit</button>
        </div>
        <h3 className="account"> Don't have an account?</h3>
        <br></br>
        <Link to="/SignUp" className="signup">
          Sign Up
        </Link>
      </div>
    </div>
    </div>
    </>
  );
}

/* <div id="loginform-con" className="container">
        <form className="login-form" onSubmit={submit}>
          <label htmlFor="username">User Name: </label>
          <input
            id="username"
            className="text-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <div id="username-error" className="input-error">
            {username === "" && "Username is required"}
          </div>

          <label htmlFor="password">Password: </label>
          <input
            id="password"
            className="text-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div id="password-error" className="input-error">
            {password === "" && "Password is required"}
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleClick} className="button2" id="button2">
          Sign Up
        </button>
      </div> */

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       if (!res.ok) throw new Error("Something went wrong!");
//       console.log(await res.json());
//       // Reset form
//       setUsername("");
//       setPassword("");
//     } catch (err) {
//       console.log("Error: ", err);
//     }
//   };

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/SignUp");
//   };

//   const handleClick2 = () => {
//     navigate("/SignUp");
//   };
