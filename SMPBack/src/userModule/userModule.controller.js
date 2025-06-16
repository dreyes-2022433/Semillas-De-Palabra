import UserModule from './userModule.model.js'
import Module from '../module/module.model.js'

export const moduleAssigment = async(userId) => {
    try {
        const modules = await Module.find()

        const userModuleAssignments = modules.map(mod => ({
            user: userId,
            module: mod._id,
            made: false
        }))

        await UserModule.insertMany(userModuleAssignments)
    } catch (err) { 
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}