import React from 'react'
import { Login } from '../../components/Auth/Login.jsx'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <div className="auth-container">
      <Login handleIsLogin={goToRegister} />
    </div>
  )
}
