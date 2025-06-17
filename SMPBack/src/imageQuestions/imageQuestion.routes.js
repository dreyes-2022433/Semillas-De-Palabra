import { Router } from 'express'
import { 
    createImageQuestion, 
    deleteImageQuestion, 
    getImageQuestions, 
    updateImageQuestion 
} from './imageQuestion.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validAddImgQuestion, 
    validDeleteImgQuestion, 
    validUpdaImgQuestion 
} from '../../helpers/validators.js'

import upload from '../../middlewares/multer.js'
import cloudinary from '../../config/cloudinary.js'
import ImageQuestion from './imageQuestion.model.js'
import Module from '../module/module.model.js'
import { parse } from 'dotenv'
import { body } from 'express-validator'

const api = Router()

api.post(
    '/addImageQuestion', [
        validateJwt,
        isAdmin,
        validAddImgQuestion
    ],
    createImageQuestion
)

api.get(
    '/getImageQuestions', [
        validateJwt,
        isAdmin
    ],
    getImageQuestions
)

api.put(
    '/updateImageQuestion', [
        validateJwt,
        isAdmin,
        validUpdaImgQuestion
    ],
    updateImageQuestion
)

api.delete(
    '/deleteImageQuestion', [
        validateJwt,
        isAdmin,
        validDeleteImgQuestion
    ],
    deleteImageQuestion
)

api.post('/uploadImageQuestion', upload.single('image'), async (req, res) => {
    
    try{
        console.log('aca entro al API')
        const moduleId = req.body.moduleId
        const {name, mainAudio, audio1, audio2, audio3, audio4,answer1,answer2,answer3,answer4} = req.body
        const stream = cloudinary.uploader.upload_stream(
            {folder: 'SemillasDepalabra'},
           async (error, result) => { 
                    if(error) {
                        console.error('Error uploading image:', error)
                        return res.status(500).send({
                            error: 'Error al subir la imagen'
                        })
                    }
                const addImageQuestion = new ImageQuestion({
                        name,
                        img: result.secure_url,
                        mainAudio,
                        audio1,
                        answer1 : Boolean(answer1),
                        audio2,
                        answer2 : Boolean(answer2),
                        audio3,
                        answer3 : Boolean(answer3),
                        audio4,
                        answer4 : Boolean(answer4),

                    })
                    console.log(name)
                    const moduleExtis = await Module.findById(moduleId)

                     if(!moduleExtis){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Module not found'
                }
            )
        }

        await addImageQuestion.save()

        moduleExtis.resources.push({
            refId: addImageQuestion._id,
            kind: 'ImageQuestion'
        })

        await moduleExtis.save()

        return res.send(
            {
                success: true,
                message: 'Image question added successfully',
                addImageQuestion
            }
        )
            })
            stream.end(req.file.buffer)
    }catch (error) {
        console.error('Error uploading image:', error)
        return res.status(500).send({
            error: 'Error al subir la imagen al servidor'
        })
    }
})




export default api