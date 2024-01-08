const mongoose = require('mongoose')

var user = new mongoose.Schema({
    registeredAt: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
})

exports.user = new mongoose.model('user', user, 'user')
