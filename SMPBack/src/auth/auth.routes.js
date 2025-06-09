import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidation, loginValidation } from "../../helpers/validators.js";

const api = Router()

//Registrar
api.post(
    '/register', [
        registerValidation
    ],
    register
)

//Login
api.post(
    '/login', 
    [
        loginValidation
    ], 
    login
)


//Exportar 
export default api