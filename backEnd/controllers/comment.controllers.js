const Post = require('../models/Post.model')
const Comment = require('./../models/Comment.model')

function addComment(req, res, next) {

    const { _id: user } = req.payload
    const { text, post } = req.body


    Comment
        .create({ text, user, post })
        .then((comment) => {
            return Post.findByIdAndUpdate(comment.post, { $push: { comments: comment._id } })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))


}

module.exports = { addComment }