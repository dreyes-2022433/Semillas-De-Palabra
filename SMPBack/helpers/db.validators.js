import User from '../src/user/user.model.js'
import { isValidObjectId } from 'mongoose'

export const objectIdValid = async(objectId) => {
    if(!isValidObjectId(objectId)){
        throw new Error('Is not a valid ObjectId')
    }
}

export const findUser = async(id)=>{
    try {
        const userExiste = await User.findById(id)
        if(!userExiste) return false
        return userExiste
    } catch (err) {
        console.error(err)
        return false
    }
}   