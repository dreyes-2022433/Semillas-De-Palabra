import { checkPassword, encrypt} from '../../utils/encrypt.js'
import User from '../user/user.model.js'
import { generateJwt } from '../../utils/jwt.js'

export const updateUser = async (req, res) => {
    const { idUser, name, surname, CUI } = req.body

    try {
        const adminUser = req.user
        const userToUpdate = await User.findById(idUser)

        if (!userToUpdate) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found, not updated'
                }
            )
        }

        if (adminUser.role === 'ADMIN' && userToUpdate.role === 'ADMIN' && adminUser.uid !== id) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You cannot modify another ADMIN.'
                }
            )
        }

        if (adminUser.role !== 'ADMIN' && adminUser.uid !== idUser) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You can only edit your own profile.'
                }
            )
        }

        if (CUI && CUI !== userToUpdate.CUI) {
            const existingCUI = await User.findOne(
                { 
                    CUI:CUI
                }
            )

            if (existingCUI) {
                return res.status(400).send(
                    {
                        success: false,
                        message: 'The CUI already exists in another user.'
                    }
                )
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            idUser,
            {
                name,
                surname,
                CUI
            },
            {
                new: true
            }
        )

        return res.send(
            {
                success: true,
                message: 'User updated successfully :)',
                updatedUser
            }
        )

    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updating User',
                err
            }
        )
    }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params // <- Ahora viene de la URL
    const adminUser = req.user

    if (adminUser.role !== 'ADMIN') {
      return res.status(403).send(
            {
                success: false,
                message: 'Only admins can delete users.'
            }
        )
    }

    const userToDelete = await User.findById(id)

    if (!userToDelete) {
      return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
    }

    if (userToDelete.role === 'ADMIN' && adminUser.uid !== id) {
      return res.status(403).send(
            {
                success: false,
                message: 'You cannot delete another ADMIN.'
            }
        )
    }

    userToDelete.status = false
    await userToDelete.save()

    return res.send(
        {
            success: true,
            message: `Account ${userToDelete.name} deleted successfully`
        }
    )

  } catch (err) {
    console.error(err)
    return res.status(500).send(
        {
            success: false,
            message: 'General error when deleting user',
            err
        }
    )
  }
}


export const updatePassword = async (req, res) => {
    try {

        const { idUser, currentPassword, newPassword } = req.body

        if (idUser !== req.user.uid) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not authorized to update this password. :('
                }
            )
        }

        const user = await User.findById(idUser)
        if (!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )


        const isMatch = await checkPassword(user.password, currentPassword)
        if (!isMatch) return res.status(400).send(
            {
                message: 'Incorrect password',
                success: false
            }
        )

        if (currentPassword === newPassword) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'New password cannot be the same as the current password jeje :) .'
                }
            )
        }

        user.password = await encrypt(newPassword)
        await user.save()

        return res.send(
            {
                success: true,
                message: 'Password updated successfully'
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

export const getAll = async(req, res)=>{
    const { limit , skip } = req.query
    try {
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Users not Found :('
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found :)',
                total: users.length,
                users
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}

export const getAllUsersByRole = async (req, res) => {
    const { limit, skip } = req.query
    const userRequesting = req.user

    if (userRequesting.role !== 'ADMIN' && userRequesting.role !== 'HELPER') {
        return res.status(403).send(
            {
                success: false,
                message: 'Only ADMIN or HELPER can view users with role USER.'
            }
        )
    }

    try {
        const users = await User.find(
            { 
                role: 'USER' 
            }
        )
            .skip(skip)
            .limit(limit)

        if (users.length === 0) {
            return res.send(
                {
                    success: false,
                    message: 'Users with role "USER" not found :('
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Users with role USER found :)',
                total: users.length,
                users
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}

export const getOneUser = async (req, res) => {
    const userRequesting = req.user
    const { id } = req.params


    if (userRequesting.role !== 'ADMIN' && userRequesting.role !== 'HELPER') {
        return res.status(403).send(
            {
                success: false,
                message: 'Only ADMIN or HELPER can view a user.'
            }
        )
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send(
                    {
                    success: false,
                    message: 'User not found.'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'User found :)',
                user
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}

export const loginAsUser = async (req, res) => {
    const { id } = req.params
    const userRequesting = req.user

    if (userRequesting.role !== 'ADMIN' && userRequesting.role !== 'HELPER') {
        return res.status(403).send(
            {
                success: false,
                message: 'Only ADMIN or HELPER can login as another user.'
            }
        )
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found.'
                }
            )
        }

        if (user.status === false) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'This user account is deactivated.'
                }
            )
        }

        const loggerUser = {
            uid: user._id,
            name: user.name,
            role: user.role
        }

        const token = await generateJwt(loggerUser)

        return res.send(
            {
                success: true,
                message: `Now logged in as ${user.name} ${user.surname}`,
                loggerUser,
                token
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error trying to login as user',
                err
            }
        )
    }
}