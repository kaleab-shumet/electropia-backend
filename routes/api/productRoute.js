const express = require('express')
const Product = require('./../../models/Product')

const productRoute = express.Router();

productRoute.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const newProductObject = await newProduct.save()

    return res.status(200).json(newProductObject);
  }

  catch (error) {
    return res.status(500).json({ error: error.message })
  }
})


productRoute.get('/', async (req, res) => {
  const { page, perPage, catagory } = req.query;
  try {

    console.log('Page: ', page, " perPage: ", perPage);
    // Load latest updated products
    const paginateOptions = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 15,
      sort: "-updated",
    }
    let queryObject = {}
    if (catagory)
      queryObject = {
        catagory
      }

    const productList = await Product.paginate( queryObject, paginateOptions)

    return res.status(200).json(productList.docs)

  }

  catch (error) {

  }
})


productRoute.get('/:id/detail', async (req, res) => {
  const { id } = req.params
  console.log('Product detail', id);
  try {

    const product = await Product.findById(id)
    return res.status(200).json(product)
  }
  catch (error) {
  }
})


module.exports = productRoute