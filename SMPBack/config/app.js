'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 
import authRoutes from '../src/auth/auth.routes.js'
import moduleRouter from '../src/module/module.routes.js'
import userRoutes from '../src/user/user.routes.js'
import audioQuestionRoutes from '../src/audioQuestions/audioQuestion.routes.js'
import imageQuestionRoutes from '../src/imageQuestions/imageQuestion.routes.js'
import videoLessonRoutes from '../src/videoLessons/videoLesson.routes.js'
import userModuleRoutes from '../src/userModule/userModule.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import 'dotenv/config'
export const config = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

export const routes = (app)=>{
    //Rutas públicas
    app.use(authRoutes)
    app.use('/v1/module', moduleRouter)
    app.use('/v1/user', userRoutes)
    app.use('/v1/audioQuestion', audioQuestionRoutes)
    app.use('/v1/imageQuestion', imageQuestionRoutes)
    app.use('/v1/videoLesson', videoLessonRoutes)
    app.use('/v1/userModule', userModuleRoutes)
}


export const initServer = async ()=>{
    const app = express()
    try{
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.error('Error initializing server:', err)
    }

}