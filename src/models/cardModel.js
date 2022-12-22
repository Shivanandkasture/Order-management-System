const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({

    cardNumber: { type: String, trim: true },
    cardType: {type:String, enum: ["REGULAR", "SPECIAL"], required: true, trim: true },
    customerName: { type: String, trim: true },
    status: { type: String, trim: true, default: 'ACTIVE' },
    vision: { type: String, required: true, trim: true },
    customerID: { type: String, trim: true, ref: "customerID" },

}, { timestamps: true })

module.exports = mongoose.model("CardData", cardSchema)      