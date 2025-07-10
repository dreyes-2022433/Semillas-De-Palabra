import { Router } from 'express'
import { getUserModules, updateLessonStatus } from './userModule.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.put(
    '/updateLessonStatus',
    updateLessonStatus
)
api.get(
    '/getUserModules',[validateJwt], getUserModules)
export default api