const productModel = require("../models/productModel")
const customerModel = require('../models/customerModel');
const mongoose = require('mongoose')

const createProduct = async (req, res) => {
    try {

        const { productName, price, customerID } = req.body;

        if (!mongoose.Types.ObjectId.isValid(customerID)) return res.status(400).send({ status: false, message: 'Enter a valid customerId format.' })
        let customer = await customerModel.findById(customerID)
        if (!customer) return res.status(400).send({ status: false, message: 'customer does not exists.' })
        if (!productName) return res.status(400).send({ status: false, message: 'please enter productName.' })
        if (!price) return res.status(400).send({ status: false, message: 'please enter prodcut price.' })

        let product = await productModel.create(req.body)

        return res.status(201).send({ status: true, message: "product created", data: product })



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.createProduct = createProduct;