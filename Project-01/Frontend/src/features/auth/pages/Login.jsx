import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth.jsx'
import { useNavigate } from 'react-router'

const Login = () => {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const {handleLogin, loading}  = useAuth() // taking out handleLogin from useAuth
  const navigate = useNavigate()

  if(loading){
    return <h1>Loading...</h1>
  }

  async function handleFormSubmimt(e){
    e.preventDefault()

    handleLogin(username, password)
    .then(res=>{
      console.log(res)
      navigate("/")  // automatically navigate to home page after login
    })

  }

  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmimt}>
                <input onChange={(e)=>{setusername(e.target.value)}} 
                 type="text" 
                 name='username'
                  placeholder='enter your username' />
                <input onChange={(e)=>{setpassword(e.target.value)}}
                 type="password"
                 name='password' 
                 placeholder='enter your password' />

                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account <Link className='toggleAuthForm' to= '/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
