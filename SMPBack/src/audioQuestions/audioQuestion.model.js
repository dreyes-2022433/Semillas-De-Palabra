import mongoose, { Schema, model} from 'mongoose'

const audioQuestionSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Name is required']
        },
        audio: {
            type: String
        },
        img1:{
            type: String
        },
        answer1:{
            type: Boolean
        },
        img2:{
            type: String
        },
        answer2:{
            type: Boolean
        },
        img3:{
            type: String
        },
        answer3:{
            type: Boolean
        },
        img4:{
            type: String,
        },
        answer4:{
            type: Boolean
        },
        order:{
            type: Number,
            required: [true, 'Order is required']
        }
    }
)

export default model('AudioQuestion', audioQuestionSchema)