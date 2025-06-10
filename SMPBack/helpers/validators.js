import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.error.js";

// ---------------------- REGISTER ------------------------------
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

// ------------------------ LOGIN -----------------------------
export const loginValidation = [
    body('userLoggin', 'CUI cannot be empty')
        .notEmpty()
        .isLowercase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .isLength()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrorWithoutImg
]

// ----------------------- USER ----------------------
export const validUpdateUser = [
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
    body('password', 'Password cannot be empty')
        .notEmpty(),
        validateErrorWithoutImg
]


