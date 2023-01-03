const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({

    customerID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    productID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    order: { type: Number, default: 1 },
    discount: {
        type: String, default: '0'
    }, price: {
        type: Number, trim: true
    },


}, { timestamps: true })

module.exports = mongoose.model("orderData", orderSchema)      