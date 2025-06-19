import { assignNewModule } from '../userModule/userModule.controller.js'
import Module from './module.model.js'
import User from '../user/user.model.js'
import ImageQuestion from '../imageQuestions/imageQuestion.model.js';
import VideoLesson  from '../videoLessons/videoLesson.model.js';

export const createModule = async(req, res) => {
    try {
        const { name, description, img } = req.body
        
        const addModule = new Module(
            {
                name,
                description,
                img
            }
        )

        const existingModule = await Module.findOne(
            {
                name: name
            }
        )
        if(existingModule){
            return res.status(400).send(
                {
                    success: false,
                    message: 'A module with this name already exists'
                }
            )
        }

        await addModule.save()

        assignNewModule(addModule._id)

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

export const getModule = async (req, res) => {
    try {
        const idModule = req.body.idModule;
        const module = await Module.findById(idModule).lean();

        if (!module) {
            return res.status(404).send({
                success: false,
                message: 'Module not found'
            });
        }

        // Poblar los resources con los datos completos
        const populatedResources = await Promise.all(
            module.resources.map(async (resource) => {
                if (resource.kind === 'ImageQuestion') {
                    const image = await ImageQuestion.findById(resource.refId).lean();
                    return { ...resource, data: image };
                }
                if (resource.kind === 'VideoLesson') {
                    const video = await VideoLesson.findById(resource.refId).lean();
                    return { ...resource, data: video };
                }
                return resource;
            })
        );

        module.resources = populatedResources;

        return res.send({
            success: true,
            message: 'Module found',
            module: [module]
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
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