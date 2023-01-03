const customerModel = require('../models/customerModel')


const createCustomer = async (req, res) => {

    try {

        let { firstName, lastName, mobileNumber,  emailID } = req.body;

        if (!firstName || !lastName || !mobileNumber || !emailID) return res.status(400).send({ status: false, message: "please fill the all fields." })

        if (!firstName) return res.status(400).send({ status: false, message: "Please enter firstName" })

        if (!lastName) return res.status(400).send({ status: false, message: "Please enter lastName" })

        if (!mobileNumber) return res.status(400).send({ status: false, message: "Please enter mobileNumber" })

        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(mobileNumber)) return res.status(400).send({ status: false, message: "Please provide valid mobile number" })

        
        if (!emailID) return res.status(400).send({ status: false, message: "Please enter emailID" })

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailID)) return res.status(400).send({ status: false, message: "Please enter a valid emailID " })

        const isPresentMobile = await customerModel.findOne({ mobileNumber });

        if (isPresentMobile) return res.status(400).send({ status: false, message: " Mobile Number already in use" })

        const isPresentEmail = await customerModel.findOne({ emailID });

        if (isPresentEmail) return res.status(400).send({ status: false, message: " EmailId already in use" })

       
       let customer= await customerModel.create(req.body)

        return res.status(201).send({ status: true, message: "New Customer Created Succussfully.", data:customer })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





module.exports.createCustomer = createCustomer


