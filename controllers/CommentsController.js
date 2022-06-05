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
    async like(req, res) {
        try {
            const toLike = await Comment.findById(req.params._id)
            if (toLike.likes.includes(req.user._id)) {
                res.send('Ya has dado like previamente a este comentario')
            } else {
                await Comment.findByIdAndUpdate(req.params._id, { $push: { likes: req.user._id } })
                res.send(`Has dado me gusta al comentario ${req.params._id}`)
            }
        } catch (error) {
            res.send({ message: `No exite el comentario con id ${req.params._id}`, error })
        }
    },
    async unlike(req, res) {
        try {
            const target = await Comment.findById(req.params._id);
            if (!target.likes.includes(req.user._id)) {
                res.send(`No le has dado like al comentario con id ${req.params._id}`)
            } else {
                await Comment.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } })
                res.send(`Has quitado el me gusta al comentario ${req.params._id}`)
            }
        } catch (error) {
            res.send({ message: `No exite el comentario con id ${req.params._id}`, error })
        }
    }
}

module.exports = commentsController