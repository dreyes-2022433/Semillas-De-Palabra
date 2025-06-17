import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../services/api"

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const login = async (userLoggin, password) => {
    setIsLoading(true)
    
    const user = { userLoggin, password }
    
    try {
      const response = await loginRequest(user)

      setIsLoading(false)

      if (response.error) {
        setError(true)

        if (response?.error?.response?.data?.message) {
          toast.error(response?.error?.response?.data?.message)
        } else {
          toast.error("Error al intentar loguearte. Intenta de nuevo.")
        }
        return
      }

      setError(false)
      const { token, loggerUser } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(loggerUser))
      localStorage.setItem('uid', loggerUser.uid)

      console.log('🔐 TOKEN:', token)
      console.log('📦 USUARIO:', loggerUser)
      console.log('🔍 Payload del token:', JSON.parse(atob(token.split('.')[1])))

      toast.success(`Bienvenido ${loggerUser.name} ${loggerUser.surname}`)

      if (loggerUser.role === 'ADMIN') {
        navigate('/admin')
      } else if (loggerUser.role === 'HELPER') {
        navigate('/helper')
      } else {
        navigate('/main')
      }
    } catch (err) {
      setIsLoading(false)
      setError(true)
      console.error(err)
      toast.error("Error general con la función de login.")
    }
  }

  return {
    login,
    isLoading,
    error
  }
}
