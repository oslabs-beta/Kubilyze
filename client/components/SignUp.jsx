import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx"

export default function SignUp({setUsername}) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({username: '', password: '', confirm: ''})

  // this handle function handles all input fileds.
  const handleUserInput = (e)=> {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  const handleSignUpClick = () => {
    // we are checking if the two inputs match each other, for password accuracy before we send a fetch request
    if(userInput.password === userInput.confirm){
    fetch('https://kubilyze-32a4b0d50531.herokuapp.com/user/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
  })
  .then((res)=> {
    // if response status is ok we know we can continue to parse the response body with .json()
    if(res.ok) return res.json()
    // console.log('Username is taken')
  // if we hit this line, an alert will be displayed on the sceen telling the client the username entered is taken
    alert('Username is taken')
  })
  .then((data)=> {
    // if data exist, this means the response body was parsed from json to javascript and this data is the user from the server
    if(data){
      setUsername(data.username)
      navigate("/AddCluster");
    } 
    // resetting the input fields 
    setUserInput({username: '', password: '', confirm: ''})
  })
  .catch((e)=> {
    console.log(e)
  })
    
  }
  // if the two input passwords do not match, we do not send the request and alert the client
  else{
    alert("Password's don't match")
    // resetting input fileds
    setUserInput({username: '', password: '', confirm: ''})
  }

};

  



  return (
    <>
    <Navbar/>
    <div className="entirepage">
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Create your  Account</h1>
        <div className="formGroup">
          <input type="text" id="username" placeholder="Username" value={userInput.username} name="username" onChange={handleUserInput}/>
        </div>
        <div className="formGroup">
          <input type="password" id="password" placeholder="Password" value={userInput.password} name="password" onChange={handleUserInput} />
        </div>
        <div className="formGroup">
          <input type="password" id="password" placeholder="Confirm Password" value={userInput.confirm} name="confirm" onChange={handleUserInput}/>
        </div>
        <div className="submit">
          <button onClick={handleSignUpClick}>Submit</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
