const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

function signup(req, res, next) {
    const { username, email, password, avatar } = req.body
    let newAvatar
    avatar === "" ? newAvatar = './../../frontEnd/src/assets/profileDefault.jpeg' : newAvatar = avatar

    User
        .create({ username, email, password, avatar: newAvatar })
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => next(err))
}

function login(req, res, next) {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessage: ['Provide email and password.'] })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessage: ["User not found."] })
                return
            }

            if (foundUser.validatePassword(password)) {

                const { _id, email, avatar, username } = foundUser
                const payload = { _id, email, avatar, username }

                console.log("ESTOOOOOOYYYY AQUIIIIII---> ", foundUser)

                const authToken = foundUser.signToken()

                res.status(200).json({ authToken })


            }
            else {
                res.status(401).json({ errorMessage: ["Incorrect password"] })
            }
        })
        .catch(err => next(err))
}

function verify(req, res, next) {
    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports = {
    signup,
    login,
    verify
}