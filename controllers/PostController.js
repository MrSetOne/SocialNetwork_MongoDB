const Post = require("../models/Post")
const User = require("../models/User")




const postController = {
    async create(req, res, next) {
        try {
            console.log('entra en try');
            console.log({...req.body, author: req.user._id });
            const newPost = await Post.create({...req.body, userId: req.user._id })
            console.log(newPost);
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: newPost._id } })
            console.log('se ha lanzado el update de user');
            res.status(201).send({ message: 'Se ha generado un nuevo post:', newPost })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = postController