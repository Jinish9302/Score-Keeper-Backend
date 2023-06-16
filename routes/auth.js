// importing all the required node modules
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crpt = require('bcrypt')
const user = require('../models/user')
const {body, validationResult} = require('express-validator')
// const emailValidator = require('deep-email-validator')

// import router
const router = express.Router()

// Define usable functions
const convertToHash = async (PT) => {
    let pass = await crpt.genSalt(saltRounds).then((salt)=>{
        return crpt.hash(PT, salt)
    })
    .catch((err)=>{
        console.log(err)
        return null
    })
    console.log(pass)
    return pass
}

// Variables
const saltRounds=10
const secret_key = "score-keeper-4536"

// check if authentication server is working or not
router.get('/',async (req, res)=>{
    if(mongoose.connection.readyState === 1) {
        res.sendStatus(200)
    } else if(mongoose.connection.readyState === 2) {
        res.sendStatus(503)
    } else {
        res.sendStatus(500)
    }
})

// create user send web-token to creater
router.post('/create-user', [
    //Express Validators
    body('user_name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 8})
], async (req, res) => {
    // Get Validation Result and gie 400 if invalid
    // if valid and non repeated values give 200 or give 400
    const errors = await validationResult(req)
    if(errors.isEmpty()) {
        // Generate Hash of password
        let pass = await convertToHash(req.body.password)
        console.log(pass)
        // Create Data Object
        const User = user({
            user_name:req.body.user_name,
            email:req.body.email,
            password:pass
        })
        const secret_token = await jwt.sign(req.body, secret_key)
        // Save the data object if valid
        User.save()
        // Send message after saving data
        .then(()=> {
            console.log("data of "+req.body.user_name+" saved successfully")
            res.status(200).json({
                message:"user created successfully",
                token: secret_token
            })
        })
        // Catch Errors while saving
        .catch( (err) => {
            console.log(err.message)
            res.status(400).json({
                message:"user or email id already exists"
            })
        })
    } else {
        // If sign up data is not up to the standards
        res.status(400).json({
            message:[errors, "Invalid Credentials"]
        })
    }
})


// login the user/with or without token

router.post('/login', ()=>{

})

module.exports = router