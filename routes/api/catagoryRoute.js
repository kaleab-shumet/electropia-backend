const express = require('express');
const Catagory = require('../../models/Catagory');

const catagoryRoute = express.Router();

catagoryRoute.get('/', async (req, res) => {

    const catagoryList = await Catagory.find().select('_id name');
    return res.status(200).json(catagoryList)
})


catagoryRoute.post('/', async (req, res) => {
    try {
        const mCatagory = new Catagory(req.body)
        const newCatagory = await mCatagory.save();

        return res.status(201).json(newCatagory)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
})

module.exports = catagoryRoute