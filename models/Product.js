const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const { default: validator } = require('validator')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function validateRating(imgUrl) {
                return validator.isURL(imgUrl)
            },
            message: 'Invalide Rating'
        }
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5        
    },
    description: {
        type: String,
        maxlength: 20000, 
        required: true,
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    numberOfItems: {
        type: Number,
        default: 1
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },

})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', productSchema)
