'use strict'

import Comment from '../comments/comment.model.js'
import Post from '../post/post.model.js'

export const post = async(req, res)=>{
    try{
        //capturar la informacion de la BD
        let data = req.body;
        //Usar el id del usuario
        data.user = req.user._id
        //Verificar que exista el comentario
        let comment = await Comment.findOne({_id: data.comment}).populate('user', ['name'])
        if(!comment) return res.status(404).send({message: 'No comments yet'})
        //Guardar la respuesta hacia ese comentario
        let post = new Post(data)
        await post.save()
        return res.send(`You post to ${comment} with: ${post.post}`)
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error in the post', err})
    }
}
