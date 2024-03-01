'use strict'

import { Router } from 'express'
import { post } from './post.controller.js'

import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/post', [validateJwt], post)

export default api