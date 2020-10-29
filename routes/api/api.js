var express = require('express');
const Catagory = require('../../models/Catagory');
const Product = require('../../models/Product');
const catagoryRoute = require('./catagoryRoute');
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
var router = express.Router();

router.use('/product', productRoute)
router.use('/catagory', catagoryRoute)
router.use('/user', userRoute)

router.get('/', async (req, res) => {
    try {
        const { page, perPage, catagory,product} = req.query;
        console.log('Page: ', page, " perPage: ", perPage);
        // Load latest updated products
        const paginateOptions = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 15,
            sort: "-updated",
        }
        let queryObject = {}
        if (catagory){
            queryObject = {
                catagory
            }
        }
        else if(product){
            queryObject = {
                _id: product
            }
        }
        const productList = await Product.paginate(queryObject, paginateOptions)

        // Load the available catagory list
        const catagoryList = await Catagory.find({})

        // Coordinting the results
        const productListModified = {
            products: productList.docs,
            catagories: catagoryList,
            totalpages: productList.pages
        }

        return res.status(200).json(productListModified)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

module.exports = router;
