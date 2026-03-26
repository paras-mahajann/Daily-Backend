import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate();
  return (
    <div className="nav-bar">
        <p>Insta</p>
        <button onClick={()=>{navigate('/create-post')}} className='button primary-button'>New Post</button>
    </div>
  )
}

export default Nav
