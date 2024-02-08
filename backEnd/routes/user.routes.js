const router = require('express').Router()
const { verifyToken } = require('./../middlewares/verifyToken')
const {
    getById,
    getByUsername,
    addFollow,
    unfollow,
    getFollowersList,
    getFollowsList,
    getAllPostsFromFollows
} = require('./../controllers/user.controllers')


router.get('/find/:username', verifyToken, getByUsername)

router.get('/find/:_id', verifyToken, getById)

router.get('/follow/:followId', verifyToken, addFollow)

router.get('/unfollow/:followId', verifyToken, unfollow)

router.get('/followers', verifyToken, getFollowersList)

router.get('/following', verifyToken, getFollowsList)

router.get('/posts', verifyToken, getAllPostsFromFollows)

module.exports = router