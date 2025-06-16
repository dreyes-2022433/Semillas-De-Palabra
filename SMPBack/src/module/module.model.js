//Modelo de Modulo
//Modelo de Modulo
import mongoose, { Schema, model } from "mongoose";

const resourceSchema = new Schema({
    refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    kind: {
        type: String,
        required: true,
        enum: ['ImageQuestion', 'VideoLesson', 'AudioQuestion']
    }
}, { _id: false });

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
        resources: [resourceSchema],
        img: {
            type: String
        }
    }
)

//Crear y exportar el modelo
export default model('Module', moduleSchema)