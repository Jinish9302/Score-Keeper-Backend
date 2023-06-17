// importing all the required node modules
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crpt = require('bcrypt')
const user = require('../models/user')
const {body, validationResult} = require('express-validator')
const fetchUser = require('../middleware/fetchUser')
const emailValidator = require('deep-email-validator')

// import router
const router = express.Router()

// Define usable functions
const convertToHash = async (PT) => {
    let salt = await crpt.genSalt(10)
    let pass = await crpt.hash(PT, salt)
    .catch((err)=>{
        console.log(err)
        return null
    })
    return pass
}

// Variables
const secret_key = "score-keeper-4536"

// check if authentication server is working or not
router.get('/',async (req, res)=>{
    try {
        if(mongoose.connection.readyState === 1) {
            res.sendStatus(200)
        } else if(mongoose.connection.readyState === 2) {
            res.sendStatus(503)
        } else {
            res.sendStatus(500)
        }
    } catch {
        res.status(500).json({
            message:"Unexpexte Error"
        })
    }
})

// create user send web-token to creater
router.post('/create-user', [
    //Express Validators
    body('user_name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 8})
], async (req, res) => {
    try {
        // Get Validation Result and gie 400 if invalid
        // if valid and non repeated values give 200 or give 400
        const errors = await validationResult(req)
        const result = await emailValidator.validate(req.body.email)
        if(errors.isEmpty()) {
            // Generate Hash of password
            if(!result.valid) {
                return res.status(400).json({message:"Invalid Email / Email Id Doesn't exist"})
            }
            let pass = await convertToHash(req.body.password)
            console.log(pass)
            // Create Data Object
            const User = user({
                user_name:req.body.user_name,
                email:req.body.email,
                password:pass
            })
            const secret_token = await jwt.sign(req.body.user_name, secret_key)
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
    
    } catch {
        res.status(500).json({
            message:"Unexpexte Error"
        })
    }
})


// login the user
router.post('/login', async (req, res)=>{
    try {
        const user_data = await user.findOne({user_name:req.body.user_name})
        if(user_data.length === 0) {
            res.status(400).json({
                message:"User name of password does not match"
            })
        } else {
            let isValid = await crpt.compare(req.body.password, user_data.password)
            if(isValid) {
                res.status(200).json({
                    message:"UserFound",
                    token:jwt.sign(req.body.user_name, secret_key)
                })
            } else {
                res.status(400).json({
                    message:"User name of password does not match"
                })
            }
        }

    } catch {
        res.status(500).json({
            message:"Unexpexte Error"
        })
    }
})


// if marked logged in varify and get user name from token
router.get('/getUser', fetchUser, async (req, res)=>{
    try {
        let cred = await user.findOne({user_name:req.body.user_name})
        if(cred === null) {
            return
        }else if(cred.length === 0) {
            res.status(403).json({
                message:"User might no longer exist"
            })
        } else {
            res.status(200).json({
                user_name:cred.user_name,
                email:cred.email,
                varified:cred.varified
            })
        }
    } catch {
        res.status(500).json({
            message:"Unexpexte Error"
        })
    }
})

// delete user:
router.get('/deleteUser', fetchUser, async (req, res)=> {
    try {
        let cred = await user.findOne({user_name:req.body.user_name})
        if(cred === null) {
            return res.status(400).json("Bad Request")
        } else if (cred.length === 0) {
            return res.status(400).json("User Doesn't exist")
        } else {
            await user.deleteOne({user_name:req.body.user_name})
            return res.status(200).json("User Deleted Successfully")
        }
    } catch {
        res.status(500).json({
            message:"Unexpexte Error"
        })
    }
})
module.exports = router