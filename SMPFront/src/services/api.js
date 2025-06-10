import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3678',
  timeout: 2000
})

export const loginRequest = async (user) => {
  try {
    return await api.post('/login', user, {
      type: 'multipart/form-data'
    })
  } catch (error) {
    return { error: true, error }
  }
}