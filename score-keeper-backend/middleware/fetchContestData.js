const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret_key = process.env.SECRET_KEY;
const user = require('../models/user')

const fetchContestData = (req, res, next)=> {
    data = req.data
}