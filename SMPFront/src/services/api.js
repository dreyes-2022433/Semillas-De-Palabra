import axios from 'axios'
import { getUserModules } from '../../../SMPBack/src/userModule/userModule.controller'

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

export const registerRequest = async (user) => {
  try {
    return await api.post('/register', user, {
      type: 'multipart/form-data'
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const getModuleRequest = async (idModule) => {
  try {
    
    const token = localStorage.getItem('token')
    return await api.post('/v1/module/getModule',{idModule: idModule} , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}


export const updateUserRequest = async (data) => {
  try {
    const token = localStorage.getItem('token')
    return await api.put('/v1/user/updateUser', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const deleteUserRequest = async (id) => {
  try {
    const token = localStorage.getItem('token')
    return await api.delete(`/v1/user/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const getUserModulesRequest = async () => {
  try {
    const token = localStorage.getItem('token')
    return await api.get('/v1/userModule/getUserModules', {
      headers: {
        Authorization: `Bearer ${String(token)}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const getAllUsersRequest = async (limit = 10, skip = 0) => {
  try {
    const token = localStorage.getItem('token')
    return await api.get(`/v1/user/getAll?limit=${limit}&skip=${skip}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}


export const imageQuestionRequest = async (imageData) => {
  try {
    const token = localStorage.getItem('token')
    return await api.post('localhost:3678/v1/imageQuestion/uploadImageQuestion',imageData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const createModuleRequest = async (moduleData) => {
  try {
    const token = localStorage.getItem('token')
    return await api.post('/v1/module/addModule', moduleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const getModulesRequest = async () => {
  try {
    return await api.get('/v1/module/getModules');
  } catch (error) {
    return { error: true, error };
  }
}

export const deleteModuleRequest = async (idModule) => {
  try {
    const token = localStorage.getItem('token')
    return await api.delete('/v1/module/deleteModule', {
      data: { idModule },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const updateModuleRequest = async (moduleData) => {
  try {
    const token = localStorage.getItem('token')
    return await api.put('/v1/module/updateModule', moduleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    return { error: true, error }
  }
}

export const getAllUsersByRole = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/v1/user/getAllUsersByRol', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    return { error: true, message: 'Error al obtener los usuarios.' }
  }
}

export const getOneUser = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get(`/v1/user/getOneUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    return { error: true, error }
  }
}

export const loginAsUser = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get(`/v1/user/loginAs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    return { error: true, error }
  }
}