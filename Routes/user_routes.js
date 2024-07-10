const express = require('express')
const router = express.Router();
const Authenticated = require('../Middlewares/auth')
const { register, login, getAllUser, profile } = require('../Controllers/User_Controller')


// register user
router.post('/create/new/user', register)
router.post('/login/user/user', login)
router.get('/get/all/user', getAllUser)
router.get('/user/profile',Authenticated, profile)




module.exports = router