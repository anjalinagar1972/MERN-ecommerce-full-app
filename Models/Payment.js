const mongoose = require('mongoose')

const payment_Schema = new mongoose.Schema({
    orderDate : {type:Date,default:Date.now},
    payStatus : {type : String}
},{strict:false})

module.exports = mongoose.model('Payment',payment_Schema)