import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";


export default function SignUp() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    fetch('http://localhost:3000/user/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
  })
  .then((res)=> {
    if(res.ok) return res.json()
    console.log('server error')
  })
  .then((data)=> {
    if(data){
      setUsername(data.username)
      navigate("/AddCluster");
    } 
    setUsername('')
    setPassword('')
  })
  .catch((e)=> {
    console.log(e)
  })
    
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  return (
    <>
    <Navbar/>
    <div className="entirepage">
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Create your  Account</h1>
        <div className="formGroup">
          <input type="text" id="username" placeholder="Username" value={username} name="username" onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div className="formGroup">
          <input type="text" id="password" placeholder="Password" value={password} name="password" onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <div className="formGroup">
          <input type="text" id="password" placeholder="Confirm Password" name="password" />
        </div>
        <div className="submit">
          <button onClick={handleLoginClick}>Submit</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
