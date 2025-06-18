import UserModule from './userModule.model.js'
import Module from '../module/module.model.js'
import User from '../user/user.model.js'

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
    }
}

export const updateLessonStatus = async(req, res) => {
    try {
        const { idUserModule } = req.body

        const updateExistUserModule = await UserModule.findByIdAndUpdate(
            idUserModule,
            {
                made: true
            },
            {
                new: true
            }
        )

        if(!updateExistUserModule){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User module not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Status lesson updated successfully'
            }
        )
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

export const assignNewModule = async(idModule) => {
    try {

        const users = await User.find()

        const assignments = users.map(user => ({
            user: user._id,
            module: idModule
        }))

        await UserModule.insertMany(assignments)

    } catch (err) {
        console.error(err)
    }
}
export const getUserModules = async(req, res) => {
    try {
        const userId = req.user.uid
        console.log('User ID:', userId)
        if (!userId) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'User ID is required'
                }
            )
        }

        const userModules = await UserModule.find({ user: userId })
            .populate('module', 'name description img')
            .populate('user', 'name surname CUI')

        if (!userModules || userModules.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'No modules found for this user'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'User modules retrieved successfully',
                userModules
            }
        )
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