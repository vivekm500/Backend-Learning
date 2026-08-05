import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router';
import axios from "axios"


const Register = () => {


    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");



  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type="text" name="username" placeholder="enter username" />
          <input type="text" name="email" placeholder="enter email" />
          <input
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
