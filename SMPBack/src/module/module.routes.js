import { Router } from 'express'
import { createModule, deleteModule, getModules, updateModule } from './module.controller.js'

const api = Router()

api.post(
    '/addModule',
    createModule
)

api.get(
     '/getModules',
     getModules
)

api.delete(
    '/deleteModule',
    deleteModule
)

api.put(
    '/updateModule',
    updateModule
)

export default api