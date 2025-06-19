import React from 'react'
import { Register } from '../../components/Auth/Register.jsx'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <Register handleIsLogin={goToLogin} />
    </div>
  )
}
