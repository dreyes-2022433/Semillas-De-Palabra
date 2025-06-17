import mongoose, { Schema, model } from 'mongoose'

const videoLessonSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [100, `Can´t be overcome 100 characters`]
        },
        video: {
            type: String
        },
        order: {
            type: Number,
            required: [true, 'Order is required']
        }
    }
)

export default model('VideoLesson', videoLessonSchema)