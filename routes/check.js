const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// if mongoose is connected propery it returns 200
router.get('/check-connection', (req, res)=>{
    if(mongoose.connection.readyState === 1) {
        res.status(200).json({
            "message":"database is connected properly"
        })
    } else if(mongoose.connection.readyState === 2) {
        res.status(503).json({
            "message":"database is in waiting state"
        })
    } else {
        res.status(500).json({
            "message":"database is not connected"
        })
    }
})


module.exports = router