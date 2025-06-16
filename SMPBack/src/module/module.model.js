//Modelo de Modulo
import mongoose, { Schema, model } from "mongoose";

const moduleSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            maxLength: [200, `Can´t be overcome 200 characters`],
            required: [true, 'Name is required']
        },
        imageQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ImageQuestion'
        }],
        videoLessons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLesson'
        }],
        audioQuestions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AudioQuestion'
        }],
        img :{
            type: String
        }
    }
)

//Crear y exportasr el modelo
export default model('Module', moduleSchema)