import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import {loading,user,handleRegister} from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate();
  
    const handleSubmit = async (e)=>{
           e.preventDefault();

            await handleRegister(username,email,password);

            navigate('/');
           
       }
   
   
     return (
       <main>
           <div className="form-container">
               <h1>Register</h1>
               <form onSubmit={handleSubmit}>
                   <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' id='username' placeholder='Enter username'/>
                   <input onInput={(e)=>{setEmail(e.target.value)}} type="email" name='email' id='email' placeholder='Enter email' />
                   <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password' id='password' placeholder='Enter password' />
                   <button className='button primary-btn'>Register</button>
               </form>
               <p>Already have an account ? <Link to={'/login'}>Login.</Link></p>
           </div>
       </main>
  )
}

export default Register
