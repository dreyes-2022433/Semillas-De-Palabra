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



