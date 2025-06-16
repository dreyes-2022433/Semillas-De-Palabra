import Module from './module.model.js'
import User from '../user/user.model.js'

export const createModule = async(req, res) => {
    try {
        const { name, description, user, img } = req.body
        
        const addModule = new Module(
            {
                name,
                description,
                img
            }
        )

        await addModule.save()

        return res.send(
            {
                success: true,
                message: 'Module added successfully',
                addModule
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

export const getModules = async(req, res) => {
    try {
        const modules = await Module.find()
            .select('-user -content')

        if(modules.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Modules not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Modules found',
                modules
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

export const deleteModule = async(req, res) => {
    try {
        const { idModule } = req.body

        const module = await Module.findById(idModule)

        if(!module){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Module not found'
                }
            )
        }

        await Module.findByIdAndDelete(idModule)

        return res.send(
            {
                success: true,
                message: 'Module deleted successfully',
                module
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

export const updateModule = async(req, res) => {
    try {
        const { idModule, name, description, img } = req.body 

        const updatedModule = await Module.findByIdAndUpdate(
            idModule,
            {
                name,
                description,
                img
            },
            {
                new: true
            }
        )

        if(!updatedModule){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Module not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Module updated successfully',
                updatedModule
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