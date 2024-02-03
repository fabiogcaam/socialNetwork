const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const {
    addPost
} = require('../controllers/post.controllers')

router.post('/add', verifyToken, addPost)

module.exports = router