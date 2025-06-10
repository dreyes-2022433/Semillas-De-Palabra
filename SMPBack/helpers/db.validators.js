import User from '../src/user/user.model.js'
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