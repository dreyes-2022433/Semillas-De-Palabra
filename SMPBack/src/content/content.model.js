import mongoose, { Schema, model } from "mongoose";
 
const contentSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Name is required']
        },
        audios: [
            {
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
            }
        ],
        videos: [
            {
                string: {
                    mp4: {
                        type: String
                    }
                }
            }
        ],
        image: [
            {
                Mainimg:{
                    type: String
                },
                mainaudio: {
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
            }
        ]
    }
)
 
//Crear y exportar el modelo
export default model('Content', contentSchema)