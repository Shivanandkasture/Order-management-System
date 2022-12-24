const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');

let isValidCardType = function (cardType) {
    return ["REGULAR", "SPECIAL"].indexOf(cardType) !== -1
}

const createCard = async (req, res) => {

    try {
        let cardNumber

        const { cardType, vision, customerID } = req.body

        if (!cardType || !vision || !customerID)
            return res.status(400).send({ status: false, message: "Please enter the all card details." })

        if (!cardType) return res.status(400).send({ status: false, message: 'Please enter the cardType' })

        if (!vision) return res.status(400).send({ status: false, message: 'Please enter the vision' })

        let customerDetials = await customerModel.findOne({ customerID: customerID })

        if ( !customerDetials) return res.status(404).send({ status: false, message: 'customerID not exits.' })

        if (!isValidCardType(cardType))
            return res.status(400).send({ status: false, message: "Invalid request parameters in the cardType, It should be REGULAR or SPECIAL" })


        cardNumber = Date.now()

        req.body.cardNumber = 'C' + cardNumber

        let fName = customerDetials.firstName
        let lName = customerDetials.lastName
        let customerStatus = customerDetials.status
        req.body.customerName = `${fName} ${lName}`
        req.body.status = customerStatus



        let customerCard = await cardModel.create(req.body)

        return res.status(201).send({ status: true, message: "customer card created succssfully.", data: customerCard })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.stack })

    }
}


const getAllCCard = async (req, res) => {
    try {
        let cartList = await cardModel.find({})

        return res.status(200).send({ status: true, data: cartList })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.createCard = createCard;
module.exports.getAllCCard = getAllCCard