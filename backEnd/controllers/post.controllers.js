const Post = require('../models/Post.model')
const User = require('../models/User.model')

function addPost(req, res, next) {

    const { _id: user } = req.payload
    const { text } = req.body


    Post.create({ text, user })
        .then((post) => {
            return User.findByIdAndUpdate(user, { $push: { posts: post._id } })
        })
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
    const { postId } = req.body

    Post
        .findByIdAndUpdate(postId, { $push: { likes: loggedUser._id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function deleteLike(req, res, next) {

    const { payload: loggedUser } = req
    const { postId } = req.body

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