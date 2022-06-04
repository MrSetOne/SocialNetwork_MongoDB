const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')




const commentsController = {
    async create(req, res, next) {
        try {
            const newComment = await Comment.create({
                comment: req.body.comment,
                author: req.user._id,
                postId: req.params._id
            })
            await User.findByIdAndUpdate(req.user._id, { $push: { comments: newComment._id } });
            await Post.findByIdAndUpdate(req.params._id, { $push: { comments: newComment._id } })
            res.status(201).send({ message: 'Se ha añadido un nuevo comentario:', newComment })
        } catch (error) {
            console.log(error);
            next()
        }
    },
    async update(req, res) {
        try {
            if (!req.body.comment) {
                res.send('Por favor introduce un mensaje');
            }
            const updatedComment = await Comment.findByIdAndUpdate(req.params._id, { comment: req.body.comment }, { new: true });
            res.status(200).send({ message: `Comentario con id ${req.params._id} ha sido modificado`, updatedComment })
        } catch (error) {
            res.send(error)
        }
    },
    async deleteByUser(req, res) {
        try {
            await Comment.findByIdAndDelete(req.params._id)
            res.send('Comentario eliminado con exito')
        } catch (error) {
            res.send(error)
        }
    },
    async deleteByAdmin(req, res) {
        try {
            await Comment.findByIdAndDelete(req.params._id);
            res.send('Como admin has fulminado el comentario, tvto Amo');
        } catch (error) {
            res.send(error)
        }
    },

}

module.exports = commentsController