const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, unique: true },
    emailID: { type: String, reqired: true, unique: true, trim: true },
    customerCategory:{type:String,default:"Regular", enum: ['Regular', 'Gold', 'Platinum'],}    

}, { timestamps: true });

module.exports = mongoose.model("CustomerData", customerSchema)      