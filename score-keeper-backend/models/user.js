const mongoose = require('mongoose')
const  { Schema } = mongoose
const user = new Schema( {
    user_name: {
        type:String,
        unique:true,
        required:true
    },
    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    varified: {
        type: Boolean,
        default:false,
    }
})

const User = mongoose.model('user', user)
User.createIndexes()
module.exports = User