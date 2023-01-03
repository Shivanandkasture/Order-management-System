const express = require('express');
const router = express.Router();

const { createCustomer } = require('../controller/customerController')

const { createOrder } = require('../controller/orderController')

const { createProduct } = require('../controller/productController')
router.post('/createOrder', createOrder)
router.post('/createcustomer', createCustomer)
router.post('/createProduct', createProduct)


module.exports = router;
