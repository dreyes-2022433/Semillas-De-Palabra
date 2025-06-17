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
    
    // Creamos el objeto para la solicitud
    const user = { userLoggin, password }
    
    try {
      // Realizamos la solicitud de login
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

      // Guardamos los datos en el localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(loggerUser))
      localStorage.setItem('uid', loggerUser.uid)


      toast.success(`Bienvenido ${loggerUser.name} ${loggerUser.surname}`)

      // Redirigir según el rol
      if (loggerUser.role === 'ADMIN') {
        navigate('/admin')
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
