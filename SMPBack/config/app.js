'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 



export const config = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

export const routes = (app)=>{

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