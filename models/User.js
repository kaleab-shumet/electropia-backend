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
        unique: true,
        validate: {
            validator: function(v) {
              return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email`
          }
    },
    
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('User', userSchema)
