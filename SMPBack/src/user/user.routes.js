import { Router } from 'express'
import { 
    deleteUser, 
    updateUser, 
    updatePassword, 
    getAll 
} from './user.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validUpdatePassword, 
    validUpdateUser, 
    validDeleteUser 
} from '../../helpers/validators.js'

const api = Router()

api.put(
    '/updateUser',
    [
        validateJwt,
        validUpdateUser
    ],
    updateUser
)

api.delete(
    '/deleteUser/:id',
    [
        validateJwt,
        validDeleteUser
    ],
    deleteUser
)

api.get(
    '/getAll',
    [
        validateJwt,
        isAdmin
    ],
    getAll
)

api.put(
    '/updatePassword',
    [
        validateJwt,
        validUpdatePassword
    ],
    updatePassword
)

export default api