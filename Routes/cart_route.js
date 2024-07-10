const express = require('express')
const router = express.Router();
const Authenticated = require('../Middlewares/auth')
const {addToCart,userCart,removeProductFromCart,clearCart,decreaseQty} = require('../Controllers/Cart_controller')

router.post('/add/to/cart',Authenticated,addToCart)
router.get('/get/user/cart',Authenticated,userCart)
router.delete('/remove/item/cart/:productId',Authenticated,removeProductFromCart)
router.delete('/clear/cart',Authenticated,clearCart)
router.post('/--qty',Authenticated,decreaseQty)





module.exports = router