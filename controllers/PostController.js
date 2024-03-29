const Post = require("../models/Post")
const User = require("../models/User")




const postController = {
    async create(req, res, next) {
        try {
            let newPost = await Post.create({...req.body, userId: req.user._id })
            newPost = await newPost.populate('userId', ["username", "img"])
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: newPost._id } })
            res.status(201).send({ message: 'Se ha generado un nuevo post:', newPost })
        } catch (error) {
            next(error)
        }
    },
    async update(req, res) {
        try {

            const toUpdate = await Post.findById(req.params._id);
            const { userId, likes, comments, ...data } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(req.params._id, {...data, img: toUpdate.img }, { new: true }).populate('userId', ["username", "img"])
                .populate('likes', ["_id", "username", "img"])
                .populate({
                    path: "comments",
                    populate: {
                        path: "author",
                        select: ["username", "img"]
                    }
                })
            res.status(200).send({ message: 'Publicación modificada con exito', updatedPost })

        } catch (error) {
            res.send(error)
        }
    },
    async delete(req, res) {
        try {
            await Post.findByIdAndDelete(req.params._id)
            res.send('Post eliminado con exito')
        } catch (error) {
            res.send(error)
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const count = await Post.count()
            const allPosts = await Post.find()
                .sort("-createdAt")
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .populate('userId', ["-email", "-confirmed", "-role", "-likedPosts", "-updatedAt"])
                .populate('likes', ["_id", "username", "img"])
                .populate({
                    path: "comments",
                    populate: {
                        path: "author"
                    }
                })
            res.send({ allPosts, count })
        } catch (error) {
            res.send(error)
        }
    },
    async getByAuthor(req, res) {
        try {
            // const { page = 1, limit = 18 } = req.query;
            const allPosts = await Post.find({ userId: req.params._id })
                .sort("-createdAt")
                // .limit(limit * 1)
                // .skip((page - 1) * limit)
                .populate('userId', ["username", "img"])
                .populate('likes', ["_id", "username", "img"])
                .populate({
                    path: "comments",
                    populate: {
                        path: "author",
                        select: ["username", "img"]
                    }
                })
            res.send(allPosts)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    async getByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send('Busqueda demasiado larga')
            }
            const search = new RegExp(req.params.title, "i");
            const foundPosts = await Post.find({ title: search }).sort("-createdAt")
                .populate('userId', ["username", "img"])
                .populate('likes', ["_id", "username", "img"])
                .populate({
                    path: "comments",
                    populate: {
                        path: "author",
                        select: ["username", "img"]
                    }
                });
            res.send(foundPosts);
        } catch (error) {
            res.status(404).send(error)
        }
    },
    async getById(req, res) {
        try {
            const foundPosts = await Post.findById(req.params._id)
                .populate('userId', ["username", "img"])
                .populate('likes', ["_id", "username", "img"])
                .populate({
                    path: "comments",
                    populate: {
                        path: "author",
                        select: ["username", "img"]
                    }
                })
            res.send(foundPosts)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    async like(req, res, next) {
        try {
            const toLike = await Post.findById(req.params._id)
            if (toLike.likes.includes(req.user._id)) {
                res.send('Ya has dado like previamente a esta publicacion')
            } else {
                await Post.findByIdAndUpdate(req.params._id, { $push: { likes: req.user._id } })
                await User.findByIdAndUpdate(req.user._id, { $push: { likedPosts: req.params._id } })
                res.send({ msg: `Has dado me gusta al post ${req.params._id}`, user: req.user })
            }
        } catch (error) {
            res.send(error)
        }
    },
    async unlike(req, res) {
        try {
            const target = await Post.findById(req.params._id);
            if (!target.likes.includes(req.user._id)) {
                res.send(`No le has dado like a la publicacion con id ${req.params._id}`)
            } else {
                await Post.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } })
                await User.findByIdAndUpdate(req.user._id, { $pull: { likedPosts: req.params._id } })
                res.send({ msg: `Has quitado el me gusta al post ${req.params._id}`, user: req.user._id })
            }
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = postController