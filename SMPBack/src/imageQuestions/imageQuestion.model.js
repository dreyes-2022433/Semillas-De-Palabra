import mongoose, { Schema, model } from 'mongoose'

const imageQuestionSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Name is required']
        },
        img: {
            type: String
        },
        mainAudio: {
            type: String
        },
        audio1:{
            type: String
        },
        answer1:{
            type: Boolean
        },
        audio2:{
            type: String
        },
        answer2:{
            type: Boolean
        },
        audio3:{
            type: String
        },
        answer3:{
            type: Boolean
        },
        audio4:{
            type: String
        },
        answer4:{
            type: Boolean
        },
        order: {
            type: Number,
            required: [true, 'Order is required']
        }
    }
)

export default model('ImageQuestion', imageQuestionSchema)