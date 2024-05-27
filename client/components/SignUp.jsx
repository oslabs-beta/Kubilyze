import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx"

export default function SignUp({setUsername}) {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    if(password === cPassword){
    fetch('http://localhost:3000/user/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: inputUser, password})
  })
  .then((res)=> {
    if(res.ok) return res.json()
    // console.log('Username is taken')
    alert('Username is taken')
  })
  .then((data)=> {
    if(data){
      setUsername(data.username)
      navigate("/AddCluster");
    } 
    setInputUser('')
    setPassword('')
    setCpassword('')
  })
  .catch((e)=> {
    console.log(e)
  })
    
  }
  else{
    alert("Password's don't match")
    setInputUser('')
    setPassword('')
    setCpassword('')
  }

};

  const [inputUser, setInputUser] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');



  return (
    <>
    <Navbar/>
    <div className="entirepage">
    <div className="loginContainer">
      <div id="loginform">
        <h1 className="title">Create your  Account</h1>
        <div className="formGroup">
          <input type="text" id="username" placeholder="Username" value={inputUser} name="username" onChange={(e)=> setInputUser(e.target.value)}/>
        </div>
        <div className="formGroup">
          <input type="password" id="password" placeholder="Password" value={password} name="password" onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <div className="formGroup">
          <input type="password" id="password" placeholder="Confirm Password" value={cPassword} name="password" onChange={(e)=> setCpassword(e.target.value)}/>
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
