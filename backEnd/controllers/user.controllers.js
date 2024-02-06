const User = require("./../models/User.model")

function getById(req, res, next) {

    const { payload: loggedUser } = req
    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
}

function getByUsername(req, res, next) {

    const { payload: loggedUser } = req
    const { username } = req.params

    User
        .find({
            $and: [
                { username: new RegExp(`^${username}`) },
                { username: { $ne: loggedUser.username } }
            ]
        })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
}

function addFollow(req, res, next) {

    const { payload: loggedUser } = req
    const { followId } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser, { $push: { following: followId } }),
        User.findByIdAndUpdate(followId, { $push: { followers: loggedUser } })
    ]

    Promise
        .all(promises)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function unfollow(req, res, next) {

    const { payload: loggedUser } = req
    const { followId } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser._id, { $pull: { following: followId } }),
        User.findByIdAndUpdate(followId, { $pull: { followers: loggedUser._id } })
    ]

    Promise
        .all(promises)
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
}

function getFollowersList() {

    const { payload: loggedUser } = req

    User
        .findById(loggedUser)
        .populate("followers")
        .then(result => res.json(result.followers))
        .catch(err => next(err))
}

function getFollowsList() {

    const { payload: loggedUser } = req

    User
        .findById(loggedUser)
        .populate("following")
        .then(result => res.json(result.following))
        .catch(err => next(err))
}

function getPostFeed() {

    const { followId } = req.params

    User
        .findById(followId)
        .populate("posts")
        .then(result => res.json(result.posts))
        .catch(err => next(err))

}


module.exports = {
    getById,
    getByUsername,
    addFollow,
    unfollow,
    getFollowersList,
    getFollowsList,
    getPostFeed
}