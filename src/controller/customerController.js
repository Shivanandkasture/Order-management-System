const customerModel = require('../models/customerModel')
const short = require('short-uuid');
const cardModel = require('../models/cardModel');
const moment = require("moment")

let isValidStatus = function (status) {
    return ["ACTIVE", "INACTIVE"].indexOf(status) !== -1
}
const createCustomer = async (req, res) => {

    try {

        let { firstName, lastName, mobileNumber, DOB, emailID, address, status } = req.body;

        if (!firstName || !lastName || !mobileNumber || !DOB || !emailID || !address || !status) return res.status(400).send({ status: false, message: "please fill the all fields." })

        if (!firstName) return res.status(400).send({ status: false, message: "Please enter firstName" })

        if (!lastName) return res.status(400).send({ status: false, message: "Please enter lastName" })

        if (!mobileNumber) return res.status(400).send({ status: false, message: "Please enter mobileNumber" })

        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(mobileNumber)) return res.status(400).send({ status: false, message: "Please provide valid mobile number" })

        if (!DOB) return res.status(400).send({ status: false, message: "DOB is required!" })

        DOB = moment(DOB).format("YYYY-MM-DD")

        if (!emailID) return res.status(400).send({ status: false, message: "Please enter emailID" })

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailID)) return res.status(400).send({ status: false, message: "Please enter a valid emailID " })

        const isPresentMobile = await customerModel.findOne({ mobileNumber });

        if (isPresentMobile) return res.status(400).send({ status: false, message: " Mobile Number already in use" })

        const isPresentEmail = await customerModel.findOne({ emailID });

        if (isPresentEmail) return res.status(400).send({ status: false, message: " EmailId already in use" })

        req.body.customerID = short.generate()

        if (!address) return res.status(400).send({ status: false, message: "Please enter address" })

        if (!status) return res.status(400).send({ status: false, message: "Please enter status" })
        if (!isValidStatus(status))
            return res.status(400).send({ status: false, message: "Invalid request parameters in the status, It should be ACTIVE or INACTIVE" })

        await customerModel.create(req.body)

        return res.status(201).send({ status: true, message: "New Customer Created Succussfully.", data: req.body })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getAllCustomerList = async (req, res) => {

    try {

        let customers = await customerModel.find({ status: "ACTIVE" })

        return res.status(200).send({ status: true, data: customers })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

const deleteCustomer = async (req, res) => {

    try {
        let customerId = req.body.customerID
        let customerDetials = await customerModel.findOne({ customerId })

        if (!customerDetials) return res.status(404).send({ status: false, message: "customer does not exits." })

        if (!customerDetials.status == "INACTIVE") return res.status(200).send({ status: true, message: 'customer already deleted.' })
        //let updatedReview = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: { reviewedBy, rating, review } }, { upsert: true, new: true });

        await customerModel.updateOne({ customerID: customerId }, { status:"INACTIVE" })

        await cardModel.updateOne({ customerID: customerId }, { status:"INACTIVE" })

        return res.status(200).send({ status: true, message: "customer detials deleted Succussfully." })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.createCustomer = createCustomer
module.exports.getAllCustomerList = getAllCustomerList
module.exports.deleteCustomer = deleteCustomer