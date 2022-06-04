const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')




const commentsController = {
    async create(req, res) {

        try {
            const { likes, ...data } = req.body
            const newComment = await Comment.create({
                data,
                author: req.user._id,
                postId: req.params._id
            })
            await User.findByIdAndUpdate(req.user._id, { $push: { comments: newComment._id } });
            await Post.findByIdAndUpdate(req.params._id, { $push: { comments: newComment._id } })
            res.status(201).send({ message: 'Se ha añadido un nuevo comentario:', newComment })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = commentsController