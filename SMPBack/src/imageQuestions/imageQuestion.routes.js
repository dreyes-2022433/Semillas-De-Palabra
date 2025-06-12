import { Router } from 'express'
import { 
    createImageQuestion, 
    deleteImageQuestion, 
    getImageQuestions, 
    updateImageQuestion 
} from './imageQuestion.controller.js'

const api = Router()

api.post(
    '/addImageQuestion',
    createImageQuestion
)

api.get(
    '/getImageQuestions',
    getImageQuestions
)

api.put(
    '/updateImageQuestion',
    updateImageQuestion
)

api.delete(
    '/deleteImageQuestion',
    deleteImageQuestion
)

export default api