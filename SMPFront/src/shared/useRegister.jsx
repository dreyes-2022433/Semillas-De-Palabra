import { useState } from "react"
import toast from "react-hot-toast"
import { registerRequest } from "../services/api"
import { useNavigate } from "react-router-dom"


export const useRegister = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    

    const register = async(user) => {
        setIsLoading(true)
        const response = await registerRequest(user)
        setIsLoading(false)
      if(response.error){
        setError(true)
        if(response?.error?.response?.data?.errors){
            let arrayErrors = response?.error?.response?.data?.errors
            for (const error of arrayErrors) {
                return toast.error(JSON.stringify(error.msg))
            }
        }
        return toast.error(
            response?.error?.response?.data?.message ||
            response?.error?.data?.message ||
            'Error general al intentar registrar al usuario. Intenta de nuevo'
        )
      }
      setError(false)
        toast.success('Usuario registrado correctamente')
    }
    return {
        register,
        isLoading,
        error,
        setError,
}

}