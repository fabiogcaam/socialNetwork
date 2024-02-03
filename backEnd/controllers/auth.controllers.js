const bcrypt = require('bcryptjs')
const jwt = require('express-jwt')
const User = require('../models/User.model')

const signup = (req, res, next) => {

    const { username, email, password, avatar } = req.body
    let newAvatar
    avatar === "" ? newAvatar = './../../frontEnd/src/assets/profileDefault.jpeg' : newAvatar = avatar

    User
        .create({ username, email, password, avatar: newAvatar })
        .then(() => res.status(201).json({ message: "user created successfully" }))
        .catch(err => {
            console.log("----> Estoy aquí", username, "valor")
            next(err)
        })

}


const login = (req, res, next) => {

    const { email, password } = req.body

    if (email == '' || password == '') {
        res.status(400).json({ errorMessage: ["Provide email and password"] })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessage: ["User not found"] })
            }

            if (foundUser.validatePassword(password)) {
                const { _id, username, email, password } = foundUser
                const payload = { _id, username, email, password }

                const authToken = foundUser.signToken()

                res.status(200).json({ authToken })

            } else {
                res.status(400).json({ errorMessage: ["Incorrect Message"] })
            }

        })
        .catch(err => next(err))

}

const verify = (req, res, next) => {
    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports = {
    signup,
    login,
    verify
}