//Generador de Tokens
'use strict'

import jwt from 'jsonwebtoken'
                                //Objeto con datos usuarios
export const generateJwt = async(payload)=>{
    try {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '3h', 
                algorithm: 'HS256' 
            }
        )
    } catch (err) {
        console.error(err)
        return err
    }
}