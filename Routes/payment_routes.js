const express = require('express')
const {checkOut,verify,userOrder,AllOrders} = require('../Controllers/Payment_Controller')
const Authenticated = require('../Middlewares/auth')

const router = express.Router();

router.post('/checkout',checkOut)
router.post('/verify-payment',verify)
router.get('/user/order',Authenticated,userOrder)
router.get('/all/orders',AllOrders)



module.exports = router