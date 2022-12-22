const express = require('express');
const router = express.Router();

const{ createCustomer,deleteCustomer,getAllCustomerList} = require('../controller/customerController')

 const {createCard , getAllCCard}= require('../controller/cardController')



router.post('/createcustomer', createCustomer)
router.post('/createcard', createCard)
router.get('/customerlist', getAllCustomerList)
router.get('/cardlist', getAllCCard)
router.delete('/deletecustomer', deleteCustomer)


module.exports = router;
