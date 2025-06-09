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