import React, { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';


const Register = () => {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function submitHandler(e){
      e.preventDefault();

     
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>          
          <input 
                onInput={(e)=>{setUsername(e.target.value)}} 
                type="text" 
                name="username" 
                placeholder='Set your username' />
          <input 
                onInput={(e)=>{setEmail(e.target.value)}}
                type="text" 
                name="email" 
                autoComplete='current-email'
                placeholder='Enter email' />
          <input 
                onInput={(e)=>{setPassword(e.target.value)}}
                type="password" 
                name='password' 
                autoComplete='current-password'
                placeholder='Set password' />
          <button>Register</button>
        </form>

        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
