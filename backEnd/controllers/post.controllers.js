const Post = require('../models/Post.model')

function addPost(req, res, next) {

    const { id } = req.params
    const { text } = req.body

    Post
        .create({ text })
        .then(() => res.status(201))
        .catch(err => next(err))
}

function getPost(req, res, next) {

    const { id } = req.params

    Post
        .findById({ id })
        .then(result => res.json(result))
        .catch(err => next(err))
}

function likePost(req, res, next) {

    const { payload: loggedUser } = req
    const { postId } = req.params

    Post
        .findByIdAndUpdate(postId, { $push: { likes: loggedUser._id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function deleteLike(req, res, next) {

    const { payload: loggedUser } = req
    const { postId } = req.params

    Post
        .findByIdAndUpdate(postId, { $pull: { likes: loggedUser._id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))

}

module.exports = {
    addPost,
    getPost,
    likePost,
    deleteLike
}