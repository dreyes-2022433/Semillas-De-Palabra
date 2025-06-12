import { Router } from 'express'
import { 
    createVideoLesson, 
    deleteVideoLesson, 
    getVideoLessons,
    updateVideoLesson
} from './videoLesson.controller.js'

const api = Router()

api.post(
    '/addVideoLesson',
    createVideoLesson
)

api.get(
    '/getVideoLessons',
    getVideoLessons
)

api.put(
    '/updateVideoLesson',
    updateVideoLesson
)

api.delete(
    '/deleteVideoLesson',
    deleteVideoLesson
)
export default api