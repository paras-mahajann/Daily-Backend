import React, { useState } from 'react'
import '../style/login.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await handleLogin(form)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to login')
    }
  }

  return (
    <main className='login-page'>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <FormGroup
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <button className='button' type='submit'>Login</button>
          {error && <p className='form-error'>{error}</p>}
        </form>
        <p>Don't have an account? <Link to={'/register'}>Register Here</Link></p>
      </div>
    </main>
  )
}

export default Login
