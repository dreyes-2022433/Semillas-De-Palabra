//Module de Contenid
import mongoose, { Sechema, model } from "mongoose";

const contentSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Name is required']
        },
        question: [
            {
                audio: { 
                    type: String 
                },
                images: { 
                    type: String 
                },
                video: { 
                    type: String 
                },
                text: { 
                    type: String 
                }    
            }
        ]
    }
)

//Crear y exportar el modelo
export default model('Content', contentSchema)