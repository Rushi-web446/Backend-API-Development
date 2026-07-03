const mongoose = require("mongoose");

const userConnScheema = new mongoose.Schema({

    from:{
        type:String,
        required:true,
        trim:true
    },

    to:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },

    status:{
        type:String,
        enum:["Pending", "Accepted", "Rejected"]
    }
    
}, {timestamps:true});


module.exports = mongoose.model("User_Conn", userConnScheema);