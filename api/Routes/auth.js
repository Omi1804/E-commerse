const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password:req.body.password -->but we just cant put the password directly into db without encryption
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY) //-> through this an encrypted form of password goes into database
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if (!user) {
            return res.status(401).json("Wrong Credentials!");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET_KEY)
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8) //converting password to string
        if (Originalpassword !== req.body.password) {
            return res.status(401).json("Wrong Credentials");
        }

        //implementing the JWT Token to indentify the admin property of an perticular id user
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY)

        //implementing more level of security by even hiding it form the response
        const {password, ...others} = user._doc //mongo stores data inside doc folder so we have to extract form there

        res.status(200).json({...others,accessToken})

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
