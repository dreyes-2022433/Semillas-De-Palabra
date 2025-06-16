import mongoose, { Schema, model } from 'mongoose'

const userModuleSchema = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        module: {
            type: mongoose.Schema.ObjectId,
            ref: Module
        },
        made: {
            type: Boolean,
            default: false
        }
    }
)

export default model('UserModule', userModuleSchema)