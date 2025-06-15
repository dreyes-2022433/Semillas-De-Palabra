'use strict'

import { findUser } from '../helpers/db.validators.js'
import jwt from 'jsonwebtoken'

// Validar que venga un token válido y que no haya expirado
export const validateJwt = async (req, res, next) => {
  try {
    const secretKey = process.env.SECRET_KEY
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const token = authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : authorization

    const user = jwt.verify(token, secretKey)

    const validateUser = await findUser(user.uid)
    if (!validateUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found - Unauthorized'
      })
    }

    req.user = user
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).send({ message: 'Invalid token or expired' })
  }
}

// Validación por roles (después de validateJwt)
export const isAdmin = async (req, res, next) => {
  try {
    const { user } = req
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).send({
        success: false,
        message: `You don't have access | name: ${user.name}`
      })
    }
    next()
  } catch (err) {
    console.error(err)
    return res.status(403).send({
      success: false,
      message: 'Unauthorized role'
    })
  }
}
