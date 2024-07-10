const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()

// middleware
app.use(morgan('dev'))
app.use(cors({
    origin:true,
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true
}))
app.use(express.json())

// home route
app.get('/', (req,res) => {
    res.send({message : 'welcom to backend home route'})
})

// routes
const user_Routes = require('./Routes/user_routes')
const product_Routes = require('./Routes/product_route')
const cart_Rotes = require('./Routes/cart_route')
const address_Routes = require('./Routes/address_routes')
const payment_Routes = require('./Routes/payment_routes')

// api middleware
app.use('/api',user_Routes)
app.use('/api',product_Routes)
app.use('/api',cart_Rotes)
app.use('/api',address_Routes)
app.use('/api',payment_Routes)



// server run
myPort = process.env.PORT || 4000
app.listen(myPort,()=>{
    console.log("server is listen",process.env.PORT);
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>{
        console.log('backend is connected to db');
    }).catch((err)=>{
        console.log(err,"not connected");
    })
})