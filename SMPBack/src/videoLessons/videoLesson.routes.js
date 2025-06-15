import { Router } from 'express'
import { 
    createVideoLesson, 
    deleteVideoLesson, 
    getVideoLessons,
    updateVideoLesson
} from './videoLesson.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validAddVideoLesson, 
    validDeleteVideoLesson, 
    validUpdaVideoLesson 
} from '../../helpers/validators.js'

const api = Router()

api.post(
    '/addVideoLesson', [
        validateJwt,
        isAdmin,
        validAddVideoLesson
    ],
    createVideoLesson
)

api.get(
    '/getVideoLessons', [
        validateJwt,
        isAdmin
    ],
    getVideoLessons
)

api.put(
    '/updateVideoLesson', [
        validateJwt,
        isAdmin,
        validUpdaVideoLesson
    ],
    updateVideoLesson
)

api.delete(
    '/deleteVideoLesson', [
        validateJwt,
        isAdmin,
        validDeleteVideoLesson
    ],
    deleteVideoLesson
)
export default api