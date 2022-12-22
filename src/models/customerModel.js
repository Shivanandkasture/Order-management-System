const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, unique: true },
    DOB: { type: String, required: true },
    emailID: { type: String, reqired: true, unique: true, trim: true },
    address: { type: String, required: true },
    customerID: { type: String, trim: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], required: true },
    

}, { timestamps: true });

module.exports = mongoose.model("CustomerData", customerSchema)      