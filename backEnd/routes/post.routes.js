const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const {
    addPost, getPost, likePost, deleteLike
} = require('../controllers/post.controllers')


router.post('/add', verifyToken, addPost)

router.get('/find/:id', verifyToken, getPost)

router.post('/addLike/:postId', verifyToken, likePost)

router.post('/deleteLike/:postId', verifyToken, deleteLike)


module.exports = router