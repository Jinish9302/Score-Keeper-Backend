const jwt = require('jsonwebtoken')
const secret_key = "score-keeper-4536"

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
    }catch{
        res.status(401).json({
            message: "request header must have a valid authentication token (auth-token)"
        })
    }
    next()
}


module.exports = fetchUser