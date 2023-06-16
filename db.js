const mongoose = require('mongoose')
const conn_str = "mongodb+srv://jinishtrivedi9302:kinnari24@score-keeper-database.vonhpqm.mongodb.net/"

const connect_to_db = async ()=>{
    await mongoose.connect(conn_str)
    .then(()=> {
        console.log("Connected To mongo successfully")
    }).catch((err)=> {
        console.log(err)
    })
}

module.exports = connect_to_db