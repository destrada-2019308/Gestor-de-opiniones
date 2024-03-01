'use strict'

import User from './user.model.js'
import { generateJwt } from '../utils/jwt.js'
import { encrypt, checkPassword} from '../utils/validator.js'

export const registerUser = async(req, res) =>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message: `Welcome ${user.name}`})
    } catch (error) {
        return res.status(500).send({message: 'Error register'})
    }
}


export const login = async(req, res)=>{
    try {
        let { account , password } = req.body

        // Validar que exista por medio de variable de account
        let user = await User.findOne({
            $or: [
                { username: account },
                { email: account }
            ]
        })

        // Verificar que sea la misma contraseña
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
            }
            // Generar el token
            let token = await generateJwt(loggedUser)

            // Responder al usuario
            return res.send({
                message: `Hello ${loggedUser.name}`,
                loggedUser,
                token
            })
        }         
        return res.status(404).send({message: 'Invalid credentials'})
    } catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}
