'use strict'

import { Router } from 'express'
import { comment, deleteComment, updateComment } from './comment.controller.js'

import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/comment', [validateJwt], comment)
api.put('/updateComment/:id', [validateJwt], updateComment)
api.delete('/deleteComment/:id', [validateJwt], deleteComment)

export default api