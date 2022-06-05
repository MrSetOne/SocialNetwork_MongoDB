const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")

const deleterPost = async(req, res, next) => {

    try {
        console.log("entramos en middelware");
        const target = await Post.findById(req.params._id);
        console.log('el target es:');
        console.log(target);
        console.log(target.likes[0]);
        console.log('En teoria se ha borrado del perfil del autor');
        if (target.likes) {
            console.log('Ha entrado a borrar los likes');
            await target.likes.forEach(item => {
                console.log("estas dentro del bucle");
                User.findByIdAndUpdate(item, { $pull: { likedPosts: req.params._id } }, { new: true });
            });
        };
        if (target.comments) {
            console.log('Entras a borrar los comentarios');
            await target.comments.forEach((comment, i) => {
                const toDelete = Comment.findById(comment);
                User.findByIdAndUpdate(toDelete.author, { $pull: { comments: comment } })
                Comment.findByIdAndDelete(comment);
            })
        }
        await User.findByIdAndUpdate(target.userId, { $pull: { postIds: req.params._id } });
        next();
    } catch (error) {
        return res.send({ message: 'Algo ha salido mal en el middelware', error })
    }
}

module.exports = { deleterPost }