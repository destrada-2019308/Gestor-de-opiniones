import { Router } from "express"
import { createComment, updateComment, deleteC } from '../comments/comment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/createComment', [validateJwt], createComment)
api.put('/updateComment/:id', [validateJwt], updateComment)
api.delete('/deleteC/:id', [validateJwt], deleteC)

export default api