const Post = require('../models/Post.model')

function addPost(req, res, next) {

    const { id } = req.params
    const { text } = req.body

    Post
        .create({ text })
        .then(() => res.status(201))
        .catch(err => next(err))
}

module.exports = {
    addPost
}