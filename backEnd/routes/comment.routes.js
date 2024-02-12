const router = require('express').Router()
const { verifyToken } = require('./../middlewares/verifyToken')
const {
    addComment
} = require("./../controllers/comment.controllers")

router.post('/add', verifyToken, addComment)

module.exports = router