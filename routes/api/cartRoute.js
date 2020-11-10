const express = require('express');
const cartRoute = express.Router();
const User = require('./../../models/User')
const jwt = require('jsonwebtoken')
const createError = require('http-errors');
const { create } = require('./../../models/User');
const Product = require('../../models/Product');
const { UserAuth } = require('../../utils/auth');

cartRoute.post('/', UserAuth, async (req, res, next) => {
    try {
        const productID = req.body.product;
        console.log({ productID });
        if (!productID) {
            throw createError.BadRequest('You should provide a product')
        }
        const currentProduct = await Product.findById(productID)
        if (!currentProduct) {
            throw createError.NotFound('Unable to find a product')
        }
        const userid = req.userid;
        const currentUser = await User.findById(userid).populate('cart')
        if (!currentUser) {
            throw createError.Unauthorized()
        }
        currentUser.cart.push(currentProduct)
        await currentUser.save()
        return res.status(200).json(currentUser.cart)
    }
    catch (error) {
        next(error)
    }
})

cartRoute.get('/', UserAuth, async (req, res, next) => {
    try {
        const userid = req.userid;
        const currentUser = await User.findById(userid).populate('cart')
        if (!currentUser) {
            throw createError.Unauthorized()
        }



        return res.json(currentUser.cart)

    } catch (error) {
        next(error)
    }
})


cartRoute.delete('/:cartIndex', UserAuth, async (req, res, next) => {
    try {
        const userid = req.userid;
        
        if (!req.params.cartIndex) {
            throw createError.BadRequest('You shoud provide a product index')
        }
        const cartIndex = parseInt(req.params.cartIndex, 10)
        if(isNaN(cartIndex)){
            throw createError.BadRequest()
        }
        
        console.log({cartIndex});
         
        
        const currentUser = await User.findById(userid).populate('cart')
        if (!currentUser) {
            throw createError.Unauthorized()
        }

        if (cartIndex < 0 && cartIndex >= currentUser.cart.length){
            throw createError.BadRequest()
        }
        currentUser.cart.splice(cartIndex, 1)
        await currentUser.save()
        return res.json(currentUser.cart)

    } catch (error) {
        next(error)
    }
})

module.exports = cartRoute