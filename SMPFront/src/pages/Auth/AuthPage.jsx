"use client"

import { useState } from "react"
import { Login } from "../../components/Auth/Login.jsx"
import { Register } from "../../components/Auth/Register.jsx"

//Componente exportado por Named (Quiero tener más componentes en un archivo)
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const handleIsLogin = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div className="auth-container">
      {isLogin ? (
        <>
          <Login handleIsLogin={handleIsLogin} />
        </>
      ) : (
        <>
          <Register handleIsLogin={handleIsLogin} />
        </>
      )}
    </div>
  )
}
