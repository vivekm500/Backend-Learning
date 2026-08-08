import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router';
import axios from "axios"
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';


const Register = () => {


    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const {handleRegister, loading} = useAuth() //take out handleRegister and loading from our custom hook useAuth

    const navigate = useNavigate()

    if(loading){
      return (
        <h1>Loading...</h1>
      )
    }

    async function handleFormSubmimt(e){
      e.preventDefault();


      handleRegister(username, email, password)
      .then(res=>{
        console.log(res)

        navigate("/login") // automatically navigate to login page after successfull registration
      })
      
    }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmimt}>
          <input onChange={(e)=>{
            setusername(e.target.value)}}
            type="text" name="username" placeholder="enter username" />

          <input onChange={(e)=>{setemail(e.target.value)}}
           type="email" 
           name="email" 
           placeholder="enter email" />

          <input onChange={(e)=>{setpassword(e.target.value)}}
            type="passwword"
            name="password"
            placeholder="enter password"
          />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register
