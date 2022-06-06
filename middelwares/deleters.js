const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")

const deleterPost = async(req, res, next) => {
    try {
        const target = await Post.findById(req.params._id);
        if (target.likes) {
            await target.likes.forEach(item => {
                User.findByIdAndUpdate(item, { $pull: { likedPosts: req.params._id } }, { new: true });
            });
        };
        if (target.comments) {
            target.comments.forEach(async(comment) => {
                const toDelete = await Comment.findById(comment.toString());
                await User.findByIdAndUpdate(toDelete.author, { $pull: { comments: comment } })
                await Comment.findByIdAndDelete(comment);
            })
        }
        await User.findByIdAndUpdate(target.userId, { $pull: { postIds: req.params._id } });
        next();
    } catch (error) {
        return res.send({ message: 'Algo ha salido mal en el middelware', error })
    }
}

module.exports = { deleterPost }