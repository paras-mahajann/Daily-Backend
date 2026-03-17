import React, { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

  const [email,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const {handleLogin , loading} = useAuth()
  const navigate = useNavigate()


  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }
  
  function submitHandler(e){
    e.preventDefault();

    handleLogin(email,password)    
    .then(res=>{
            
        navigate('/')   
    })

  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input onInput={(e)=>{setUsername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='Enter username' />

                <input 
                onInput={(e)=>{setPassword(e.target.value)}} 
                type="text" 
                name='password' 
                placeholder='Enter password'/>
                
                <button>Login</button>
            </form>

            <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
