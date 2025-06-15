import { body } from 'express-validator'
import { validateErrorWithoutImg } from './validate.error.js'
import { objectIdValid } from './db.validators.js'

export const registerValidation = [
    body('name', 'Name cannot be empty and can´t be overcome 50 characters')
        .notEmpty(),
    body('surname', 'Surname cannot be empty and can´t be overcome 50 characters')
        .notEmpty(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8}),
    body('CUI', 'CUI cannot be empty and can´t be overcome 13 characters')
        .notEmpty(),
        validateErrorWithoutImg
]

export const loginValidation = [
    body('userLoggin', 'CUI cannot be empty')
        .notEmpty()
        .isLowercase(),
    body('password', 'Password cannot be empty')
        .notEmpty(),
    validateErrorWithoutImg
]

export const validUpdateUser = [
    body('idUser', 'Id User cannot be empty')
        .notEmpty(),
    body('name', 'Name is optional and cannot be overcome 50 characters')
        .optional()
        .isLength({max: 50}),
    body('surname', 'Surname is optional and cannot be overcome 50 characters')
        .optional()
        .isLength({max: 50}),
    body('CUI', 'CUI cannot is optional and cannot be overcome 13 characters')
        .optional()
        .isLength({max: 13}),
    validateErrorWithoutImg
]

export const validUpdatePassword = [
    body('idUser', 'Id User cannot be empty')
        .notEmpty(),
    body('currentPassword', 'Current password cannot be empty')
        .notEmpty() 
        .withMessage('Password cannot be empty'),
    body('newPassword', 'New password cannot be empty')
        .notEmpty()
        .withMessage('Your new password cannot be empty')
        .isStrongPassword()
        .withMessage('Your new password must be strong')
        .isLength({ min: 8 }) 
        .withMessage('New password must be at least 8 characters long'),
        validateErrorWithoutImg
]

export const validDeleteUser = [
    body('idUser', 'Id User cannot be empty')
        .notEmpty(),
    body('password', 'Password cannot be empty')
        .notEmpty(),
        validateErrorWithoutImg
]

export const validCreateModule = [
    body('name', 'name cannot be empty')
        .notEmpty()
        .isLength({max: 50})
        .withMessage('Name cannot be overcome 50 characters'),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({max: 200})
        .withMessage('Description cannot be overcome 200 characters'),
    body('user', 'User cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const validUpdateModule = [
    body('idModule', 'Id Module cannot be empty')
        .notEmpty(),
    body('name', 'name is optional')
        .optional()
        .isLength({max: 50})
        .withMessage('Name cannot be overcome 50 characters'),
    body('description', 'Description is optional')
        .optional()
        .isLength({max: 200})
        .withMessage('Description cannot be overcome 200 characters'),
    body('made', 'Made is optional')
        .optional(),
    body('img', 'IMG is optional')
        .optional(),
    validateErrorWithoutImg
]

export const validDeleteModule = [
    body('idModule', 'Id Module cannot be empty')
        .notEmpty(),
    validateErrorWithoutImg
]

export const validAddAudioQuestion = [
    body('name', 'name cannot be empty')
        .notEmpty()
        .isLength({max: 100})
        .withMessage('Name cannot be overcome 100 characters'),
    body('audio', 'Audio cannot be empty')
        .notEmpty(),
    body('img1', 'Image 1 cannot be empty')
        .notEmpty(),
    body('answer1', 'Answer 1 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('img2', 'Image 2 cannot be empty')
        .notEmpty(),
    body('answer2', 'Answer 2 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('img3', 'Image 3 cannot be empty')
        .notEmpty(),
    body('answer3', 'Answer 3 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('img4', 'Image 4 cannot be empty')
        .notEmpty(),
    body('answer4', 'Answer 4 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('order', 'Order cannot be empty')
        .notEmpty()
        .isInt()
        .withMessage('The data should be an Int'),
    body('module', 'Module cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const validDeleteAudioQuestion = [
    body('idAudioQuestion', 'ID Audio Question cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const validUpdaAudioQuestion = [
    body('idAudioQuestion', 'ID Audio Question cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('name', 'name cannot be empty')
        .optional()
        .isLength({max: 100})
        .withMessage('Name cannot be overcome 100 characters'),
    body('audio', 'Audio is Optional')
        .optional(),
    body('img1', 'Image 1 is Optional')
        .optional(),
    body('answer1', 'Answer 1 is Optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('img2', 'Image 2 is Optional')
        .optional(),
    body('answer2', 'Answer 2 is Optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('img3', 'Image 3 is Optional')
        .optional(),
    body('answer3', 'Answer 3 is Optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('img4', 'Image 4 is Optional')
        .optional(),
    body('answer4', 'Answer 4 is Optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('order', 'Order is Optional')
        .optional()
        .isInt()
        .withMessage('The data should be an Int'),
    validateErrorWithoutImg
]

export const validAddImgQuestion = [
    body('name', 'name cannot be empty')
        .notEmpty()
        .isLength({max: 100})
        .withMessage('Name cannot be overcome 100 characters'),
    body('img', 'Image cannot be empty')
        .notEmpty(),
    body('mainAudio', 'Main Audio cannot be empty')
        .notEmpty(),
    body('audio1', 'Audio 1 cannot be empty')
        .notEmpty(),
    body('answer1', 'Answer 1 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('audio2', 'Audio 2 cannot be empty')
        .notEmpty(),
    body('answer2', 'Answer 2 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('audio3', 'Audio 3 cannot be empty')
        .notEmpty(),
    body('answer3', 'Answer 3 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('audio4', 'Audio 4 cannot be empty')
        .notEmpty(),
    body('answer4', 'Answer 4 cannot be empty')
        .notEmpty()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('module', 'Module cannot be empty')
            .notEmpty()
            .custom(objectIdValid),
    body('order', 'Order cannot be empty')
        .notEmpty()
        .isInt()
        .withMessage('The data should be an Int'),
    validateErrorWithoutImg
]

export const validUpdaImgQuestion = [
    body('idImageQuestion', 'ID Image Question cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('name', 'name is optional')
        .optional()
        .isLength({max: 100})
        .withMessage('Name cannot be overcome 100 characters'),
    body('img', 'Image is optional')
        .optional(),
    body('mainAudio', 'Main Audio is optional')
        .optional(),
    body('audio1', 'Audio 1 is optional')
        .optional(),
    body('answer1', 'Answer 1 is optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('audio2', 'Audio 2 is optional')
        .optional(),
    body('answer2', 'Answer 2 is optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('audio3', 'Audio 3 is optional')
        .optional(),
    body('answer3', 'Answer 3 is optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('audio4', 'Audio 4 is optional')
        .optional(),
    body('answer4', 'Answer 4 is optional')
        .optional()
        .isBoolean()
        .withMessage('The data should be a Boolean'),
    body('module', 'Module is optional')
        .optional()
        .custom(objectIdValid),
    body('order', 'Order is optional')
        .optional()
        .isInt()
        .withMessage('The data should be an Int'),
    validateErrorWithoutImg
]

export const validDeleteImgQuestion = [
    body('idImageQuestion', 'ID Image Question cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const validAddVideoLesson = [
    body('name', 'name cannot be empty')
        .notEmpty()
        .isLength({max: 100})
        .withMessage('Name cannot be overcome 100 characters'),
    body('video', 'Video cannot be empty')
        .notEmpty(),
    body('order', 'Order cannot be empty')
        .notEmpty()
        .isInt()
        .withMessage('The data should be an Int'),
    body('module', 'Module cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const validUpdaVideoLesson = [
    body('idVideoLesson', 'ID Video Lesson cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('name', 'name is optional')
        .optional()
        .isLength({max: 100})
        .withMessage('Name cannot be overcome 100 characters'),
    body('video', 'Video is optional')
        .optional(),
    body('order', 'Order is optional')
        .optional()
        .isInt()
        .withMessage('The data should be an Int'),
    validateErrorWithoutImg
]

export const validDeleteVideoLesson = [
    body('idVideoLesson', 'ID Video Lesson cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]


