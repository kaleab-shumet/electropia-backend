const jwt = require('jsonwebtoken')
const Product = require('../models/Product')
const User = require('../models/User')



const OptionalUserAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers

        const accessToken = authorization.split(' ')[1]

        const accessTokenDecoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY)
        const { userid } = accessTokenDecoded
        
        User.findById(userid).populate('cart').select('-password').then(user => {           
            
            req.user = user.toObject();

            next()

        }).catch(e => {
            next()
        })

    }

    catch (error) {
        next()
    }    
}



function UserAuth(req, res, next) {
    try {
        const { authorization } = req.headers
        if (!authorization)
            throw createError.BadRequest('You should login to add cart')
        const accessToken = authorization.split(' ')[1]
        const authDecoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY)
        const { userid } = authDecoded

        req.userid = userid
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = {
    OptionalUserAuth,
    UserAuth
}