import { Router } from 'express'
import { 
    createAudioQuestion, 
    deleteAudioQuestion, 
    getAudioQuestions, 
    updateAudioQuestion
} from './audioQuestion.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validAddAudioQuestion, 
    validDeleteAudioQuestion, 
    validUpdaAudioQuestion 
} from '../../helpers/validators.js'

const api = Router()

api.post(
    '/addAudioQuestion', [
        validateJwt,
        isAdmin,
        validAddAudioQuestion
    ],
    createAudioQuestion
)

api.get(
    '/getAudioQuestion', [
        validateJwt,
        isAdmin
    ],
    getAudioQuestions
)

api.put(
    '/updateAudioQuestion', [
        validateJwt,
        isAdmin,
        validUpdaAudioQuestion
    ],
    updateAudioQuestion
)

api.delete(
    '/deleteAudioQuestion', [
        validateJwt,
        isAdmin,
        validDeleteAudioQuestion
    ],
    deleteAudioQuestion
)

export default api