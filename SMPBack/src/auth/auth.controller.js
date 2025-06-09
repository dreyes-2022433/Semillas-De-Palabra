import User from '../user/user.model.js'
import { checkPassword, encrypt} from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

// -------------------------- ADMIN POR DEFECTO -------------------------------------
export const initAdminUser = async(req, res) => {
    try {
        // Verificar si ya existe un usuario con rol ADMIN
        let admin = await User.findOne(
            { 
                role: 'ADMIN' 
            }
        )
        
        if (!admin) {
            const adminData = {
                name: 'Admin',
                surname: 'Admin',
                password: '1024578@Vv0412',
                CUI: '1782154200101',
                role: 'ADMIN'
            }

            let newAdmin = new User(adminData)
            newAdmin.password = await encrypt(newAdmin.password)
            await newAdmin.save();
            
            console.log('Admin user created successfully!')
        } else {
            //console.log('Admin user already exists!')
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'Error creating admin user:', 
                err
            }
        )
    }
}

// ---------------------------- REGISTRAR USUARIO ------------------------------------------------
export const register = async(req, res)=>{
    try {
        let data = req.body
        let existingUser = await User.findOne(
            { 
                CUI: data.CUI 
            }
        )
        if (existingUser) {
            return res.status(400).send(
                {
                    message: `CUI ${data.CUI} is already registered. Please use a different one.`
                }
            )
        }
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'USER'
        await user.save()
        return res.send(
            {
                message: `Registred successfully, Welcome ${user.name} can be logger with your CUI: ${user.CUI}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General Error with rigestering user', 
                err
            }
        )
    }
}

// --------------------------- LOGIN ---------------------------------------
export const login = async(req, res)=>{
    try {
        //Capturamos datos
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({ CUI: userLoggin })
        if (!user) {
            return res.status(400).send(
                {
                    message: 'User not found with the provided CUI'
                }
            )
        }
        if(user.status === false){
            return res.status(403).send(
                {
                    success: false,
                    message: 'This account has been desactived or deleted'
                }
            )
        }
        //Verificar que la contrasela coincida
        if(user && await checkPassword(user.password, password)){
            let loggerUser = {
                uid: user._id,
                name: user.name,
                role: user.role
            }
            //Generamos el Token
            let token = await generateJwt(loggerUser)
            return res.send(
                {
                    message: `Welcome ${user.name} ${user.surname}`,
                    loggerUser,
                    token
                }
            )
        }
        return res.status(400).send(
            {
                message: 'Wrong CUI or password'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with login function'
            }
        )
    }
}