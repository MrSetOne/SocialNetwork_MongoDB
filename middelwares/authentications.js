const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment')

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = await jwt.verify(token, jwt_secret);
        const userFound = await User.findOne({
            _id: payload.id,
            tokens: token
        });
        if (!userFound) {
            return res.status(400).send('No estas autorizado')
        };
        req.user = userFound;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            message: 'Al parecer ha habido un error con el token',
            error
        })
    }
};

const isAdmin = async(req, res, next) => {
    try {
        if (req.user.role == 'admin') {
            next();
        } else {
            return res.status(400).send('No tienes acceso a esta funcionalidad.')
        }
    } catch (error) {
        res.send('Algo ha fallado en la verificacion de admin')
    }
};

const isAuthorPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'No eres el autor de esta publicación.' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del post' })
    }
};

const isAuthorComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'No eres el autor de este comentario.' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del comentario' })
    }
};


module.exports = { authentication, isAdmin, isAuthorPost, isAuthorComment }