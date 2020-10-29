const mongoose = require('mongoose')

const catagorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Catagory', catagorySchema)
