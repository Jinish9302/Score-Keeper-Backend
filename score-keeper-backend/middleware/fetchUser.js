const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret_key = process.env.SECRET_KEY;
const user = require('../models/user')
// console.log(secret_key)

const fetchUser = async (req, res, next) => {
    token = await req.header('auth-token')
    if(!token) {
        res.status(401).json({
            message: "request header must have a valid authentication token (auth-token) --"
        })
    }

    console.log(token)
    try{
        let data = await jwt.verify(token, secret_key)
        req.body.user_name = data
        let udata = await user.findOne({user_name:data});
        console.log(udata)
        if(udata) {

        } else {
            req.status(401).json({
                message:"bad request"
            })
        }
    }catch{
        res.status(401).json({
            message: "request header must have a valid authentication token (auth-token)"
        })
    }
    next()
}


module.exports = fetchUser