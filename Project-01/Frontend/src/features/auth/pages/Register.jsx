import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router';
import axios from "axios"


const Register = () => {


    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    async function handleFormSubmimt(e){
      e.preventDefault();

      axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password
      },
    {
      withCredentials: true  // it will set the cookies
    })
      .then(res =>{
        console.log(res.data)
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
