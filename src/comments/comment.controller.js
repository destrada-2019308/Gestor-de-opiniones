'use strict'

import User from '../user/user.model.js'
import Comment from '../comments/comment.model.js'
import { checkUpdate } from '../utils/validator.js'

export const createComment = async(req, res)=>{
    try {
        //capturar la info del mensaje y del usuario
        let data = req.body
        data.user = req.user._id
        //verificar que si existe el usuario
        let user = await User.findOne({_id: data.user})
        if(!user) return res.status(404).send({message: 'User does not exists'})

        //postear el mensaje (no importa si hace 300 post)
        let comment = new Comment(data)
        await comment.save()
        //mensaje de que realizo el post
        return res.send({message: `${comment.title},\n ${comment.maintext}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error creating your post', err})
    }
}

export const updateComment = async(req, res) =>{
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be updated or missing data'})
        let updatedComment = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user', ['name'])
        if(!updatedComment) return res.status(404).send({message: 'Comment not found and not update'})
        return res.send({message: 'Comment updated successfully', updatedComment})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const deleteC = async(req, res) =>{
    try {
        let { id } = req.params
        let deleteComment = await Comment.deleteOne({_id: id})
        if(deleteComment.deleteCount === 0) return res.status(404).send({message: 'Comment not found and not deleted'})
        return res.send({message: 'Deleted comment successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}