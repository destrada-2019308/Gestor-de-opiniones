'use strict'
import {Router} from 'express'
import { login, registerUser } from './user.controller.js'

const api = Router()

api.post('/registerUser', registerUser)
api.post('/login', login)

export default api