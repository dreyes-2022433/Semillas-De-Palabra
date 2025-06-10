//Modelo de usuario
import mongoose, { Schema, model} from "mongoose";

const userSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Surname is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 25 characters`],
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password is not strong enough']
        },
        CUI: {
            type: String,
            unique: true, 
            maxLength: [13, `Can´t be overcome 13 characters`]
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN', 'USER', 'HELPER'],
        },
        status: {
            type: Boolean,
            default: true,
        },
        progress: {
            type: Number,
            default: 0
        }
    }
)

//Modificar el JSON para excluir datos en la respuesta
userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

//Crear y exportar el modelo
export default model('User', userSchema)