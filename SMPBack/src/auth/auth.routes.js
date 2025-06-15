import { Router } from 'express'
import { 
    register, 
    login 
} from './auth.controller.js'

import { 
    registerValidation, 
    loginValidation 
} from '../../helpers/validators.js'

const api = Router()

api.post(
    '/register', [
        registerValidation
    ],
    register
)

api.post(
    '/login', 
    [
        loginValidation
    ], 
    login
)
 
export default api