const express = require('express');
const User = require('../../models/User');
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userRoute = express.Router();

userRoute.get('/sign', (req,res) =>{
     return res.status(200).send('abebebesobela')
})
userRoute.post('/signup', async (req, res) => {

    console.log(req.body);
    try {
        const name = req.body.name
        const email = req.body.email;
        let password = req.body.password;

        password = await bycrypt.hash(password, 10)

        const newUser = new User({name,email, password});
        const userProp = await newUser.save()

        const token = jwt.sign({ userid: userProp._id, email: userProp.email }, process.env.JWT_KEY);

        return res.status(200).json({token})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

userRoute.post('/signin', async (req, res) => {

    return res.status(200).send
})




module.exports = userRoute