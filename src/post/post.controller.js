'use strict'
import User from '../user/user.model.js'
import Post from './post.model.js'
import { checkUpdate } from '../utils/validator.js'

export const createPost = async(req, res) =>{
    try {
        let data = req.body
        data.user = req.user._id
        let user = await User.findOne({_id: data.user})
        if(!user) return res.status(404).send({message: 'User does not exists'})
        let post = new Post(data)
        await post.save
        return res.send({message: `${post.title},\n ${post.maintext}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error creating your post', err})
    }
}

export const updatePost = async(req, res) =>{
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be updated or missing data'})
        let updatedPost = await Post.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user', ['name'])
        if(!updatedPost) return res.status(404).send({message: 'post not found and not update'})
        return res.send({message: 'post updated successfully', updatedPost})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating post'})
    }
}

export const deletePost = async(req, res) =>{
    try {
        const { id } = req.params
        const { userId } = req.body//Si el id del usuario lo envia por el request
        //Busca la publicación por id
        const post = await Post.findOne({_id: id})
        if(!post) return res.status(404).send({message: `Post not found`})
        //Verificamos que el usuario tenga el permiso de eliminar el post
        if(post.user.toString() !== userId) return res.status(403).send({message: `You're not authorized to delete this post`})
        //Eliminamos el post
        const deletedPost = await Post.deleteOne({_id: id})
        if(deletedPost.deletedCount === 0) return res.status(404).send({message: 'Post not found and not deleted'})
        return res.send({message: `Deleted post successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting post'})
    }
}
