const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const {
    addPost, getPost, likePost, deleteLike, getLikes
} = require('../controllers/post.controllers')


router.post('/add', verifyToken, addPost)

router.get('/find/:id', verifyToken, getPost)

router.get('/postLikes/:postid', verifyToken, getLikes)

router.get('/addLike/:postId', verifyToken, likePost)

router.get('/deleteLike/:postId', verifyToken, deleteLike)


module.exports = router