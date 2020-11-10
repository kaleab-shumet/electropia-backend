var express = require('express');
const Catagory = require('../../models/Catagory');
const Product = require('../../models/Product');
const { UserAuth, OptionalUserAuth } = require('../../utils/auth');
const cartRoute = require('./cartRoute');
const catagoryRoute = require('./catagoryRoute');
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
var router = express.Router();

router.use('/product', productRoute)
router.use('/catagory', catagoryRoute) 
router.use('/user', userRoute)
router.use('/cart', cartRoute)

router.get('/' ,OptionalUserAuth, async (req, res, next) => {
    try {
        const { page, perPage, catagory,product,search} = req.query;
        console.log('Page: ', page, " perPage: ", perPage);

        const sort = catagory ? "-updated":"updated"
        // Load latest updated products
        const paginateOptions = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 15,
            sort
        }

        let searchQuery = undefined;
        if(search){
            searchQuery = {$text:{$search: search}};
        }

       

        let queryObject = {catagory, _id: product, ...searchQuery}
        Object.keys(queryObject).forEach(key => queryObject[key] === undefined && delete queryObject[key]) //Clearing undefined fields
        
        console.log(queryObject);
        const productList = await Product.paginate(queryObject, paginateOptions)

        // Load the available catagory list
        const catagoryList = await Catagory.find({})


        // Getting User
        const user = req.user;

        // Coordinting the results
        const productListModified = {
            products: productList.docs,
            catagories: catagoryList,
            totalpages: productList.pages,
            user
        }

        return res.status(200).json(productListModified)
    } catch (error) {
        next(error) 
    }

})

module.exports = router;
