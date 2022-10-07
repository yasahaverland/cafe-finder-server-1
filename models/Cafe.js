const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    drink_name: {
        type: String
    },
    drink_score: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const CafeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    website_link: {
        type: String
    },
    phone_number: {
        type: String
    },
    price: {
        type: String
    },
    comment: [CommentSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { 
    timestamps: true
})

module.exports = mongoose.model('Cafe', CafeSchema)

