const mongoose = require('mongoose')
require('dotenv').config()
const conn_str = process.env.MONGO_CONNECTION_STRING
const connect_to_db = async ()=>{
    await mongoose.connect(conn_str)
    .then(()=> {
        console.log("Connected To mongo successfully")
    }).catch((err)=> {
        console.log(err)
    })
}

module.exports = connect_to_db