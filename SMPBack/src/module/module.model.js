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
        made: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        progress: {
            type: Number,
            default: 0
        },
        content: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content',
            required: [true, 'Content ID is required']
        }
    }
)

//Crear y exportasr el modelo
export default model('Module', moduleSchema)