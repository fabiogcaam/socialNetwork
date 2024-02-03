const router = require('express').Router()
const { verifyToken } = require('./../middlewares/verifyToken')
const {
    getById,
    getByUsername,
    addFollow,
    unfollow
} = require('./../controllers/user.controllers')


router.get('/find/:_id', verifyToken, getById)

router.get('/find/:username', verifyToken, getByUsername)

router.get('/follow/:followId', verifyToken, addFollow)

router.get('/unfollow/:followId', verifyToken, unfollow)

module.exports = router