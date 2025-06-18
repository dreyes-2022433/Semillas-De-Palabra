import { Router } from 'express'
import { 
    deleteUser, 
    updateUser, 
    updatePassword, 
    getAll, 
    getAllUsersByRole,
    getOneUser,
    loginAsUser
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

api.get(
    '/getAllUsersByRol', 
    [
        validateJwt,
    ],
    getAllUsersByRole
)

api.get(
    '/getOneUser/:id', 
    [
        validateJwt,
    ],
    getOneUser
)

api.get(
    '/loginAs/:id', 
    [
        validateJwt
    ],
    loginAsUser
)
 
export default api