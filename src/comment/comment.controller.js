'use strict'

import Comment from '../comment/comment.model.js'
import Post from '../post/post.model.js'

export const comment = async(req, res)=>{
    try{
        //capturar la informacion de la BD
        let data = req.body;
        //Usar el id del usuario
        data.user = req.user._id
        //Verificar que exista el comentario
        let post = await Post.findOne({_id: data.post}).populate('user', ['name'])
        if(!post) return res.status(404).send({message: 'No post yet'})
        //Guardar la respuesta hacia ese comentario
        let comment = new Comment(data)
        await comment.save()
        return res.send(`You post to ${post} with: ${comment.comment}`)
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error in the post', err})
    }
}

export const updateComment = async(req, res) => {
    try {
        let data = req.body
        const { id } = req.params
        let { userId } = req.body
        const comment = await Comment.findOne({_id: id})
        if(!comment) return res.status(404).send({message: `Comment not found`})
        if(comment.user.toString() !== userId) return res.status(403).send({message: `You're not authorized to delete this comment`})
        let updateComment = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: false}
        ).populate('user', ['name'])
        if(!updateComment) return res.status(404).send({message: 'Comment not found and not updated'})
        return res.send({message: `Comment updated successfully `, updateComment})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const deleteComment = async(req, res) =>{
    try {
        const { id } = req.params
        const { userId } = req.body//Si el id del usuario lo envia por el request
        //Busca la comment por id
        const comment = await Comment.findOne({_id: id})
        if(!comment) return res.status(404).send({message: `Comment not found`})
        //Verificamos que el usuario tenga el permiso de eliminar el commentario
        if(comment.user.toString() !== userId) return res.status(403).send({message: `You're not authorized to delete this comment`})
        //Eliminamos el post
        const deletedComment = await Comment.deleteOne({_id: id})
        if(deletedComment.deletedCount === 0) return res.status(404).send({message: 'Comment not found and not deleted'})
        return res.send({message: `Deleted comment successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}