import { Router } from 'express'
import { 
    createAudioQuestion, 
    deleteAudioQuestion, 
    getAudioQuestions, 
    updateAudioQuestion
} from './audioQuestion.controller.js'

const api = Router()

api.post(
    '/addAudioQuestion',
    createAudioQuestion
)

api.get(
    '/getAudioQuestion',
    getAudioQuestions
)

api.put(
    '/updateAudioQuestion',
    updateAudioQuestion
)

api.delete(
    '/deleteAudioQuestion',
    deleteAudioQuestion
)

export default api