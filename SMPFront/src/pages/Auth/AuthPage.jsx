import React from 'react'
import { Login } from '../../components/Auth/Login.jsx'
import { useState } from "react"
import { Register } from "../../components/Auth/Register.jsx"

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const handleIsLogin = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div className="auth-container">
        {
            isLogin ? (
                <>
        
                <Login handleIsLogin={handleIsLogin}/>
                </>
            ) : (
                <>  
                <Register handleIsLogin={handleIsLogin}/>  
                </>
            )
        }
    </div>
  )
}
