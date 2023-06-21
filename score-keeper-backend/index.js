const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const connect_to_db = require('./db')
const app = express()
const port = 3050

const cors=require("cors");

// set environment variables
require('dotenv').config()

// Connect to databse
connect_to_db()

// Back-Ground-Processes
const runFunc = async ()=> {
  console.log("Background Function Called")
}
runFunc()



// Check Status of database connectivity
mongoose.connection.once("open", function () {
  console.log("MongoDB Connected");
});
mongoose.connection.once("disconnected", function () {
  console.log("MongoDB Diconnected");
});


// Allow json files 
app.use(express.json())
app.use(cors())

// server build file
app.use(express.static(path.join(__dirname, '../score/build')))
// APIs for back-end

// check connectivity: returns 200 if all connections are fine including database and base server it self
app.use('/api/server', require('./routes/check'))

// API for authentication
app.use('/api/auth', require('./routes/auth'))

// Contest Data Fetch
app.use('/api/contest', require('./routes/contests'))

// app.listen.port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})