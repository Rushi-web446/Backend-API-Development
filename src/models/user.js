const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }

}, {timestamps:true});


module.exports = mongoose.model("User", userScheema);