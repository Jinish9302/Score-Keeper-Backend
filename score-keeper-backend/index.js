const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const connect_to_db = require('./db')
const app = express()
const port = 3000


// Connect to databse
connect_to_db()


mongoose.connection.once("open", function () {
  console.log("Mongodb is connected very succesfully");
});

app.use(express.json())
app.use(express.static(path.join(__dirname, '../score/build')))

// server works
// app.get('/', (req, res) => {
//     res.send('back-end is working just fine')
// })

// APIs for back-end

// check connectivity: returns 200 if all connections are fine including database and base server it self
app.use('/api/server', require('./routes/check'))


// API for authentication
app.use('/api/auth', require('./routes/auth'))

// app.listen.port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})