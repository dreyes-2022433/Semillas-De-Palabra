import { Router } from 'express'
import { updateLessonStatus } from './userModule.controller.js'

const api = Router()

api.put(
    '/updateLessonStatus',
    updateLessonStatus
)

export default api