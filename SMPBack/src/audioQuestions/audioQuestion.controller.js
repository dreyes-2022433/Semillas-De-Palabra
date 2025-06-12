import Module from '../module/module.model.js'
import AudioQuestion from './audioQuestion.model.js'

export const createAudioQuestion = async(req, res) => {
    try {
        const { 
            name, 
            audio, 
            img1, 
            answer1, 
            img2, 
            answer2, 
            img3, 
            answer3, 
            img4, 
            answer4, 
            order, 
            module
        } = req.body

        const addAudioQuestion = new AudioQuestion(
            {
                name, 
                audio, 
                img1, 
                answer1, 
                img2, 
                answer2, 
                img3, 
                answer3, 
                img4, 
                answer4, 
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

        await addAudioQuestion.save()

        return res.send(
            {
                success: true,
                message: 'Audio question added successfully',
                addAudioQuestion
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

export const getAudioQuestions = async(req, res) => {
    try {
        const audioQuestions = await AudioQuestion.find()

        if(audioQuestions.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Audio questions not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Audio questions found',
                audioQuestions
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

export const deleteAudioQuestion = async(req, res) => {
    try {
        const { idAudioQuestion } = req.body

        const audioQuestion = await AudioQuestion.findById(idAudioQuestion)

        if(!audioQuestion){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Audio question not found'
                }
            )
        }

        await AudioQuestion.findByIdAndDelete(idAudioQuestion)

        return res.send(
            {
                success: true,
                message: 'Audio question deleted successfully',
                audioQuestion
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

export const updateAudioQuestion = async(req, res) => {
    try {
        const { 
            idAudioQuestion,
            name, 
            audio, 
            img1, 
            answer1, 
            img2, 
            answer2, 
            img3, 
            answer3, 
            img4, 
            answer4, 
            order 
        } = req.body

        const updatedAudioQuestion = await AudioQuestion.findByIdAndUpdate(
            idAudioQuestion,
            {
                name, 
                audio, 
                img1, 
                answer1, 
                img2, 
                answer2, 
                img3, 
                answer3, 
                img4, 
                answer4, 
                order
            },
            {
                new: true
            }
        )

        if(!updatedAudioQuestion){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Audio question not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Audio question updated successfully',
                updatedAudioQuestion
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