const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists please use another email'],
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true
    },

    cart:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]

})

module.exports = mongoose.model('User', userSchema)
