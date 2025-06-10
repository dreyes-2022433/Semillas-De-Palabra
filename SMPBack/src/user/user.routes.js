import { Router } from "express";
import { deleteUser, updateUser, updatePassword, getAll } from "./user.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { validUpdatePassword, validUpdateUser, validDeleteUser } from "../../helpers/validators.js";

const api = Router()

// ---------------- ACTUALIZAR USER ------------
api.put(
    '/update/:id',
    [
        validateJwt,
        validUpdateUser
    ],
    updateUser
)
// ---------------- ELIMINAR USER --------------
api.delete(
    '/:id',
    [
        validateJwt,
        validDeleteUser
    ],
    deleteUser
)
// ----------------- LISTAR USERS ---------------
api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getAll
)
// ----------------- UPDATE CONTRASEÑA -------------
api.put(
    '/password/:id',
    [
        validateJwt,
        validUpdatePassword
    ],
    updatePassword
)

export default api