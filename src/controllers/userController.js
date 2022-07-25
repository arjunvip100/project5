const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const aws = require("../aws/aws.js")

////////////                Validation              ////////////
const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}


//////////                  CreateUser              ///////////



const createUser = async function(req, res) {
    try {
        let data = req.body
        let files = req.files
  
        if (Object.keys(data) == 0) 
           return res.status(400).send({status: false, msg: "No input provided"
        })
  
  
        if (files && files.length > 0) {
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL = await aws.uploadFile(files[0])
            data.profileImage = uploadedFileURL;
        } else {
            res.status(400).send({ msg: "profileImage is required" })
        }
  
  
        if (!isValid(data.fname)) {
            return res.status(400).send({status: false,msg: "fname is required"})
        }
  
        if (!isValid(data.lname)) {
            return res.status(400).send({status: false,msg: "lname is required"})
        }
  
        if (!isValid(data.email)) {
          return res.status(400).send({status: false,msg: "Email is required"})
        }
  
        if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {
          return res.status(400).send({status: false,msg: "valid email is required"})
        }
  
        let dupliEmail = await userModel.find({ email: data.email })
        if (dupliEmail.length > 0) {
            return res.status(400).send({status: false,msg: "email is already exists"})
        }
  
        if (!isValid(data.phone)) {
          return res.status(400).send({status: false,msg: "phone is required"})
        }
  
        if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(data.phone)) {
            return res.status(400).send({status: false,msg: "valid phone number is required"})
        }
  
        let dupliPhone = await userModel.find({ phone: data.phone })
        if (dupliPhone.length > 0) {
            return res.status(400).send({status: false,msg: "phone number already exits" })
        }
  
  
        if (!isValid(data.password)) {
            return res.status(400).send({status: false,msg: "Plz enter valid password"})
        }
  
        if (data.password.length < 8 || data.password.length > 15) {
            return res.status(400).send({status: false,msg: "passowrd min length is 8 and max length is 15"})
        }
  
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
  
  
        if (!isValid(data.address)) {
            return res.status(400).send({status: false,msg: "Plz enter address"})
        }
  
        if (!isValid(data.address.shipping)) {
            return res.status(400).send({status: false,msg: "Plz enter shipping address"})
        }
  
        if (!isValid(data.address.billing)) {
            return res.status(400).send({status: false,msg: "Plz enter billing address"})
        }
  
        if (!isValid(data.address.shipping.street)) {
            return res.status(400).send({status: false,msg: "Plz enter shipping street"})
        }
  
        if (!isValid(data.address.shipping.city)) {
            return res.status(400).send({status: false,msg: "Plz enter shipping city"})
        }
  
        if (!/^[1-9]{1}[0-9]{5}$/.test(data.address.shipping.pincode)) {
            return res.status(400).send({status: false,msg: "Plz enter shipping pincode"})
        }
  
        if (!isValid(data.address.billing.street)) {
            return res.status(400).send({status: false,msg: "Plz enter billing street"})
        }
  
        if (!isValid(data.address.billing.city)) {
            return res.status(400).send({status: false,msg: "Plz enter billing city"})
        }
  
        if (!/^[1-9]{1}[0-9]{5}$/.test(data.address.billing.pincode)) {
            return res.status(400).send({status: false,msg: "Plz enter billing pincode"})
        }
  
      
        let savedData = await userModel.create(data)
        res.status(201).send({status: true,msg: "user created successfully",msg2: savedData})
  
    } catch (error) {
        res.status(500).send({status: false,msg: error.message})
    }
  }
  

module.exports.createUser = createUser