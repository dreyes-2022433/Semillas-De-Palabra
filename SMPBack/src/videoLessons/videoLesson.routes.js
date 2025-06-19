import { Router } from 'express'
import { 
    createVideoLesson, 
    deleteVideoLesson, 
    getVideoLessons,
    updateVideoLesson
} from './videoLesson.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validAddVideoLesson, 
    validDeleteVideoLesson, 
    validUpdaVideoLesson 
} from '../../helpers/validators.js'
import upload from '../../middlewares/multer.js'
import cloudinary from '../../config/cloudinary.js'
import VideoLesson from './videoLesson.model.js'
import Module from '../module/module.model.js'


const api = Router()

api.post(
    '/addVideoLesson', [
        
    ],
    createVideoLesson
)

api.get(
    '/getVideoLessons', [
        validateJwt,
        isAdmin
    ],
    getVideoLessons
)

api.put(
    '/updateVideoLesson', [
        validateJwt,
        isAdmin,
        validUpdaVideoLesson
    ],
    updateVideoLesson
)

api.delete(
    '/deleteVideoLesson', [
        validateJwt,
        isAdmin,
        validDeleteVideoLesson
    ],
    deleteVideoLesson
)

api.post('/uploadVideoLesson', upload.single('video'), async (req, res) => {
    try{
        const moduleId = req.body.moduleId
        const name = req.body.name
        const stream = cloudinary.uploader.upload_stream({
            folder: 'SemillasDePalabra/VideoLessons'
        },
        async (error, result) => {
            if(error){
                console.error(error)
                return res.status(500).send(
                    {
                        success: false,
                        message: 'Error uploading video',
                        error
                    }
                )
            }

            const addVideoLesson = new VideoLesson({
                name,
                video: result.secure_url,
                module: moduleId
            })

            const moduleExist = await Module.findById(moduleId)

            if(!moduleExist){
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Module not found'
                    }
                )
            }

            await addVideoLesson.save()

            moduleExist.resources.push({
                refId: addVideoLesson._id,
                kind: 'VideoLesson'
            })

            await moduleExist.save()

            return res.send(
                {
                    success: true,
                    message: 'Video lesson added successfully',
                    addVideoLesson
                }
            )
        })
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }


})


export default api