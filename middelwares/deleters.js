const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")

const deleterPost = async(req, res, next) => {
    try {
        const target = await Post.findById(req.params._id);
        if (target.likes) {
            target.likes.forEach(async(like) => {
                await User.findByIdAndUpdate(like, { $pull: { likedPosts: req.params._id } });
            });
        };
        if (target.comments) {
            target.comments.forEach(async(comment) => {
                const toDelete = await Comment.findById(comment);
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

const deleterUser = async(req, res, next) => {
    try {
        const target = await User.findById(req.params._id);
        if (target.postIds) {
            target.postIds.forEach(async(post) => {
                const targetPost = await Post.findById(post);
                if (targetPost.likes) {
                    targetPost.likes.forEach(async(like) => {
                        await User.findByIdAndUpdate(like, { $pull: { likedPosts: targetPost._id } });
                    })
                }
                if (targetPost.comments) {
                    targetPost.comments.forEach(async(comment) => {
                        const toDelete = await Comment.findById(comment);
                        await User.findByIdAndUpdate(toDelete.author, { $pull: { comments: comment } });
                        await Comment.findByIdAndDelete(comment);
                    })
                }
            })
        };
        target = await User.findById(req.params._id);
        if (target.comments) {
            target.comments.forEach(async(comment) => {
                const toDelete = await Comment.findById(comment);
                await Post.findByIdAndUpdate(toDelete.postId, { $pull: { comments: comment } });
                await Comment.findByIdAndDelete(comment);
            })
        };
        target = await User.findById(req.params._id);
        if (target.followers) {
            target.followers.forEach(async(follower) => {
                await User.findByIdAndUpdate(follower, { $pull: { following: target._id } })
            })
        };
        target = await User.findById(req.params._id);
        if (target.following) {
            target.following.forEach(async(follow) => {
                await User.findByIdAndUpdate(follow, { $pull: { followers: target._id } })
            })
        };
        target = await User.findById(req.params._id);
        if (target.likedPosts) {
            target.likedPosts.forEach(async(like) => {
                await Post.findByIdAndUpdate(like, { $pull: { likes: target._id } })
            })
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = { deleterPost }