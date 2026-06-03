import React, { useState } from 'react'
import '../style/register.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await handleRegister(form)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to register')
    }
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Name"
            name="username"
            placeholder="Enter your name"
            value={form.username}
            onChange={handleChange}
          />
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
          <button className='button' type='submit'>Register</button>
          {error && <p className='form-error'>{error}</p>}
        </form>
        <p>Already have an account? <Link to={'/login'}>Login Here</Link></p>
      </div>
    </main>
  )
}

export default Register
