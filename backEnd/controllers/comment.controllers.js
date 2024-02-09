const Comment = require('./../models/Comment.model')

function addComment(req, res, next) {

    const { userId } = req.payload

    Comment
        .create({ text, userId })
        .then(() => {
            res.sendStatus(201)
        })
        .catch(err => next(err))

}