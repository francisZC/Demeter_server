const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema=new Schema({
    userName:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    avatar:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now 
    }
})

module.exports = User = mongoose.model("users", UserSchema)