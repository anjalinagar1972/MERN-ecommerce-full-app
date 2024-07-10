const mongoose = require('mongoose')

const Adress_schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    fullName : String,
    address : String,
    city : String,
    state : String,
    country : String,
    pincode : String,
    phoneNumber : String,

    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('address',Adress_schema)