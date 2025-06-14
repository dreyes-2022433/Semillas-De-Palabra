import { Router } from 'express'
import { 
    createImageQuestion, 
    deleteImageQuestion, 
    getImageQuestions, 
    updateImageQuestion 
} from './imageQuestion.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validAddImgQuestion, 
    validDeleteImgQuestion, 
    validUpdaImgQuestion 
} from '../../helpers/validators.js'

const api = Router()

api.post(
    '/addImageQuestion', [
        validateJwt,
        isAdmin,
        validAddImgQuestion
    ],
    createImageQuestion
)

api.get(
    '/getImageQuestions', [
        validateJwt,
        isAdmin
    ],
    getImageQuestions
)

api.put(
    '/updateImageQuestion', [
        validateJwt,
        isAdmin,
        validUpdaImgQuestion
    ],
    updateImageQuestion
)

api.delete(
    '/deleteImageQuestion', [
        validateJwt,
        isAdmin,
        validDeleteImgQuestion
    ],
    deleteImageQuestion
)

export default api