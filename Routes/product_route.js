const express = require('express')
const router = express.Router();
const {addProduct,getAllProduct,getById,updateProdut,delete_Product} = require('../Controllers/Product_controller');


router.post('/create/new/product',addProduct)
router.get('/get/all/product',getAllProduct)
router.get('/get/single/product/:id',getById)
router.patch('/edit/product/:id',updateProdut)
router.delete('/delete/product/:id',delete_Product)

module.exports = router