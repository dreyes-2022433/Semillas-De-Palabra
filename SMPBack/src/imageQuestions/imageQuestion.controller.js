import Module from '../module/module.model.js'
import ImageQuestion from './imageQuestion.model.js'

export const createImageQuestion = async(req, res) => {
    try {
        const {
            name,
            img,
            mainAudio,
            audio1,
            answer1,
            audio2,
            answer2,
            audio3,
            answer3,
            audio4,
            answer4,
            module,
            order
        } = req.body

        const addImageQuestion = new ImageQuestion(
            {
                name,
                img,
                mainAudio,
                audio1,
                answer1,
                audio2,
                answer2,
                audio3,
                answer3,
                audio4,
                answer4,
                module,
                order
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

        await addImageQuestion.save()

        moduleExist.resources.push({
            refId: addImageQuestion._id,
            kind: 'ImageQuestion'
        })

        await moduleExist.save()

        return res.send(
            {
                success: true,
                message: 'Image question added successfully',
                addImageQuestion
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

export const getImageQuestions = async(req, res) => {
    try {
        const imageQuestions = await ImageQuestion.find()

        if(imageQuestions.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Image questions not found'
                } 
            )
        }

        return res.send(
            {
                success: true,
                message: 'Image questions found',
                imageQuestions
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

export const deleteImageQuestion = async(req, res) => {
    try {
        const { idImageQuestion } = req.body

        const imageQuestion = await ImageQuestion.findById(idImageQuestion)

        if(!imageQuestion){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Image question not found'
                }
            )
        }

        await ImageQuestion.findByIdAndDelete(idImageQuestion)

        const module = await Module.findOne({
            resources: {
                $elemMatch: {
                    refId: imageQuestion._id,
                    kind: 'ImageQuestion'
                }
            }
        })

        if (module) {
            await Module.findByIdAndUpdate(module._id, {
                $pull: {
                    resources: {
                        refId: imageQuestion._id,
                        kind: 'ImageQuestion'
                    }
                }
            })
        }

        return res.send(
            {
                success: true,
                message: 'Image question deleted successfully',
                imageQuestion
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

export const updateImageQuestion = async(req, res) => {
    try {
        const {
            idImageQuestion,
            name,
            img,
            mainAudio,
            audio1,
            answer1,
            audio2,
            answer2,
            audio3,
            answer3,
            audio4,
            answer4,
            order
        } = req.body

        const updatedImageQuestion = await ImageQuestion.findByIdAndUpdate(
            idImageQuestion,
            {
                name,
                img,
                mainAudio,
                audio1,
                answer1,
                audio2,
                answer2,
                audio3,
                answer3,
                audio4,
                answer4,
                order
            },
            {
                new: true
            }
        )

        if(!updatedImageQuestion){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Image question not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Image question updated successfully',
                updatedImageQuestion
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