const Post = require("../models/Post")
const User = require("../models/User")




const postController = {
    async create(req, res, next) {
        try {
            const newPost = await Post.create({...req.body, userId: req.user._id })
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: newPost._id } })
            res.status(201).send({ message: 'Se ha generado un nuevo post:', newPost })
        } catch (error) {
            next(error)
        }
    },
    async update(req, res) {
        try {
            const { userId, likes, comments, ...data } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(req.params._id, data, { new: true })
            res.status(200).send({ message: 'Publicación modificada con exito', updatedPost })
        } catch (error) {
            res.send(error)
        }
    },
    async deleteByUser(req, res) {
        try {
            await Post.findByIdAndDelete(req.params._id)
            res.send('Post eliminado con exito')
        } catch (error) {
            res.send(error)
        }
    },
    async deleteByAdmin(req, res) {
        try {
            await Post.findByIdAndDelete(req.params._id);
            res.send('Como admin has fulminado el post, tvto Amo');
        } catch (error) {
            res.send(error)
        }
    },
    async getAll(req, res) {
        try {
            const allPosts = await Post.find().populate('userId')
            res.send(allPosts)
        } catch (error) {
            res.send(error)
        }
    },
    async getByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send('Busqueda demasiado larga')
            }
            const search = new RegExp(req.params.title, "i");
            const foundPosts = await Post.find({ title: search });
            res.send(foundPosts);
        } catch (error) {
            res.send(error)
        }
    },
    async getById(req, res) {
        try {
            const foundPosts = await Post.findById(req.params._id).populate('userId')
            res.send(foundPosts)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = postController