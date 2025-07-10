import { Router } from 'express'
import { 
    createAudioQuestion, 
    deleteAudioQuestion, 
    getAudioQuestions, 
    updateAudioQuestion
} from './audioQuestion.controller.js'

import { 
    isAdmin, 
    validateJwt 
} from '../../middlewares/validate.jwt.js'

import { 
    validAddAudioQuestion, 
    validDeleteAudioQuestion, 
    validUpdaAudioQuestion 
} from '../../helpers/validators.js'

import upload from '../../middlewares/multer.js'
import cloudinary from '../../config/cloudinary.js'
import AudioQuestion from './audioQuestion.model.js'
import Module from '../module/module.model.js'



const api = Router()

api.post(
    '/addAudioQuestion', [
        validateJwt,
        isAdmin,
        validAddAudioQuestion
    ],
    createAudioQuestion
)

api.get(
    '/getAudioQuestion', [
        validateJwt,
        isAdmin
    ],
    getAudioQuestions
)

api.put(
    '/updateAudioQuestion', [
        validateJwt,
        isAdmin,
        validUpdaAudioQuestion
    ],
    updateAudioQuestion
)

api.delete(
    '/deleteAudioQuestion', [
        validateJwt,
        isAdmin,
        validDeleteAudioQuestion
    ],
    deleteAudioQuestion
)

api.post('/uploadAudioQuestion', upload.array('images',4), async (req, res) => {
    try{
        const moduleId = req.body.moduleId
        const { name, audio,answer1,answer2,answer3,answer4 } = req.body
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'audioQuestions',
            },
            async (error, result) => {
                if(error){
                    console.error(error)
                    return res.status(500).send(
                        {
                            success: false,
                            message: 'Error uploading audio',
                            error
                        }
                    )
                }
                 const uploadedImages = await Promise.all(
            req.files.map(file => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'audioQuestions' },
                        (error, result) => {
                            if (error) {
                                console.error('Error uploading image:', error);
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }
                    );
                    stream.end(file.buffer);
                });
            })
        );
                const addAudioQuestion = new AudioQuestion({
                    name,
                    audio: audio,
                    img1: uploadedImages[0],
                    answer1: Boolean(answer1),
                    img2: uploadedImages[1],
                    answer2: Boolean(answer2),
                    img3: uploadedImages[2],
                    answer3: Boolean(answer3),
                    img4: uploadedImages[3],
                    answer4: Boolean(answer4),
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
                await addAudioQuestion.save()
                moduleExist.resources.push({
                    refId: addAudioQuestion._id,
                    kind: 'AudioQuestion'
                })
                await moduleExist.save()
                return res.send(
                    {
                        success: true,
                        message: 'Audio question added successfully',
                        addAudioQuestion
                    }
                )
            }
            
        )
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