import Module from '../module/module.model.js'
import VideoLesson from './videoLesson.model.js'

export const createVideoLesson = async(req, res) => {
    try {
        const { name, video, order, module } = req.body

        const addVideoLesson = new VideoLesson(
            {
                name,
                video,
                order,
                module
            }
        )

        const moduleExist = await Module.findById(module)
        
        if(!moduleExist){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Module not found'
                }
            )
        }

        await addVideoLesson.save()

        return res.send(
            {
                success: true,
                message: 'Video lesson added successfully',
                addVideoLesson
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const getVideoLessons = async(req, res) => {
    try {
        const videoLessons = await VideoLesson.find()

        if(videoLessons.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Video lessons not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Video lessons found',
                videoLessons
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const deleteVideoLesson = async(req, res) => {
    try {
        const { idVideoLesson } = req.body

        const videoLesson = await VideoLesson.findById(idVideoLesson)

        if(!videoLesson){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Video lesson not found'
                }
            )
        }

        await VideoLesson.findByIdAndDelete(idVideoLesson)

        return res.send(
            {
                success: true,
                message: 'Video lesson deleted successfully',
                videoLesson
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const updateVideoLesson = async(req, res) => {
    try {
        const { idVideoLesson, name, video, order} = req.body

        const updatedVideoLesson = await VideoLesson.findByIdAndUpdate(
            idVideoLesson,
            {
               name,
               video,
               order 
            },
            {
                new: true
            }
        )

        if(!updatedVideoLesson){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Video lesson not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Video lesson updated successfully',
                updatedVideoLesson
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}