const express = require('express')
const router = express.Router();
const Authenticated = require('../Middlewares/auth')
const {addAddress,getAddress} = require('../Controllers/Address_Controller')


router.post('/add/shipping/address',Authenticated,addAddress)
router.get('/get/shipping/address',Authenticated,getAddress)

module.exports = router