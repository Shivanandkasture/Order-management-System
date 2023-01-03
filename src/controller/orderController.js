const orderModel = require('../models/order');
const customerModel = require('../models/customerModel');
const productModel = require('../models/productModel');
const mongoose = require('mongoose')

let orderDetails

const createOrder = async (req, res) => {


    try {
        const { customerID, productID } = req.body;

        orderDetails = await orderModel.findOne({ customerID, productID })

        if (!mongoose.Types.ObjectId.isValid(customerID)) return res.status(400).send({ status: false, message: 'Enter a valid customerId format.' })

        let customer = await customerModel.findById(customerID)

        if (!customer) return res.status(400).send({ status: false, message: 'customer does not exists.' })


        if (!mongoose.Types.ObjectId.isValid(productID)) return res.status(400).send({ status: false, message: 'Enter a valid productID format.' })

        let product = await productModel.findById(productID)

        if (!product) return res.status(400).send({ status: false, message: 'product does not exists.' })

        if (orderDetails) {
            if (orderDetails.order > 0) {

                orderData = await orderModel.findOneAndUpdate({ customerID }, { $inc: { order: 1 } });

                orderData.order = orderData.order + 1

                if (orderDetails.order < 10) {

                    return res.status(200).send({ status: true, message: "order created", order: orderData.order })
                }

                else if (orderDetails.order == 10) {

                    orderDetails.price -= (orderDetails.price / 100) * 10

                    let updatedData = await customerModel.findOneAndUpdate({ customerID }, { customerCategory: 'Platinum' }, { new: true })

                    await orderModel.findOneAndUpdate({ customerID }, { price: orderDetails.price, discount: "10" });

                    return res.status(200).send({ status: true, message: "your are promoted to gold card and 10% discount.", data: updatedData })
                }
                else if (orderDetails.order > 10 && orderDetails.order < 20) {

                    return res.status(200).send({ status: true, message: "order created", order: orderDetails.order })
                }
                else if (orderDetails.order == 20) {

                    orderDetails.price -= (orderDetails.price / 100) * 20

                    let updatedData = await customerModel.findByIdAndUpdate({ _id: customerID }, { customerCategory: 'Gold' }, { new: true })

                    await orderModel.findOneAndUpdate({ customerID }, { price: orderDetails.price, discount: "20" });

                    return res.status(200).send({ status: true, message: "your are promoted to Gold card and 20% discount.", data: updatedData })
                }
                else {

                    return res.status(200).send({ status: true, message: "order created", order: orderDetails.order })

                }

            }
        }
        req.body.price = product.price


        let order = await orderModel.create(req.body)

        return res.status(201).send({ status: true, message: "order created", data: order })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.createOrder = createOrder;

