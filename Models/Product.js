const mongoose = require('mongoose')

const Product_schema = mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    category : String,
    qty : Number,
    imgSrc : String,
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('products',Product_schema)