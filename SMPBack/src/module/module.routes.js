import { Router } from 'express'
import { 
    createModule, 
    deleteModule, 
    getModules, 
    updateModule 
} from './module.controller.js'

import { 
    validCreateModule, 
    validDeleteModule, 
    validUpdateModule 
} from '../../helpers/validators.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post(
    '/addModule', [
        validateJwt,
        isAdmin,
        validCreateModule
    ],
    createModule
)

api.get(
     '/getModules',
     getModules
)

api.delete(
    '/deleteModule', [
        validateJwt,
        isAdmin,
        validDeleteModule
    ],
    deleteModule
)

api.put(
    '/updateModule', [
        validateJwt,
        isAdmin,
        validUpdateModule
    ],
    updateModule
)

export default api