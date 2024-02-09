const Post = require('../models/Post.model')

function addPost(req, res, next) {

    const { _id: user } = req.payload
    const { text } = req.body

    console.log("ENTRAMOS AQUIIIIII")

    Post
        .create({ text, user })
        .then(() => res.sendStatus(201).json("post created succesfully"))
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