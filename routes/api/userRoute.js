const express = require('express');
const User = require('../../models/User');
const bycrypt = require('bcryptjs')
const createError = require('http-errors');
const generateTokens = require('../../utils/TokenGen');

const userRoute = express.Router();


userRoute.post('/signin', async (req, res, next) => {

    try {
        const email = req.body.email;

        const iUser = await User.findOne({ email })

        if (!iUser) {
            throw createError.Unauthorized()
        }

        const reqPassword = req.body.password;

        const passwordMatch = await bycrypt.compare(reqPassword, iUser.password)

        if (!passwordMatch) {
            throw createError.Unauthorized()
        }

        return res.json(generateTokens(iUser._id, iUser.email))
    }
    catch (error) {
        next(error)
    }

})

userRoute.post('/signup', async (req, res, next) => {

    console.log(req.body);
    try {
        const name = req.body.name
        const email = req.body.email;
        let password = req.body.password;

        password = await bycrypt.hash(password, 10)

        const newUser = new User({ name, email, password });
        const userProp = await newUser.save()

        return res.json(generateTokens(userProp._id, userProp.email))
        
    }
    catch (error) {
        next(error)
    }
})

userRoute.post('/signin', async (req, res) => {

    return res.status(200).send
})




module.exports = userRoute