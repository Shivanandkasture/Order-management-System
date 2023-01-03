const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String, trim: true
    },
    price: {
        type: Number, trim: true
    },
    customerID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Customer"
    }
}, { timestamps: true })

module.exports = mongoose.model("productData", productSchema)      