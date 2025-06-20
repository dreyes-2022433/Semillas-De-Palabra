import { Router } from 'express'
import { 
    createModule, 
    deleteModule, 
    getModule, 
    getModules, 
    updateModule 
} from './module.controller.js'

import { 
    validCreateModule, 
    validDeleteModule, 
    validUpdateModule 
} from '../../helpers/validators.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import upload from '../../middlewares/multer.js'
import cloudinary from '../../config/cloudinary.js'
import Module from './module.model.js'



const api = Router()

api.post(
    '/addModule', [
        validateJwt,
        isAdmin,
        validCreateModule
    ],
    createModule
)

api.get(
     '/getModules',
     getModules
)

api.delete(
    '/deleteModule', [
        validateJwt,
        isAdmin,
        validDeleteModule
    ],
    deleteModule
)

api.put(
    '/updateModule', [
        validateJwt,
        isAdmin,
        validUpdateModule
    ],
    updateModule
)

api.post('/getModule', getModule )

api.post('/uploadModule', upload.single('image'), async (req, res) => {
    try{
        const {name, description} = req.body
        const stream = cloudinary.uploader.upload_stream({
            folder: 'SemillasDePalabra'
        },
    async (error, result) => {
        if (error) {
            return res.status(500).send({
                message: 'Error uploading image',
                error
            })
        }

        const module = new Module({
            name,
            description,
            img: result.secure_url
        })

        await module.save()

        return res.status(200).send({
            message: 'Module image uploaded successfully',
            module
        })
    })
    stream.end(req.file.buffer)
    }catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'Error uploading module image',
            err
        })
    }


})



export default api