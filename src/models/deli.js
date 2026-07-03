const mongoose = require("mongoose");

const deliScheema = new mongoose.Schema({

    Type:{
        type:String,
        enum:["BUY", "SELL"],
    },

    fromLocation:{
        type:String,
        required:true
    },

    toLocation:{
        type:String,
        required:true
    },

    validFrom:{
        type:Date
    },

    validTo:{
        type:Date
    },

    price:{
        type:Number,
    },

    transitDays:{
        type:Number
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

}, {timestamps:true});


module.exports = mongoose.model("Deli", deliScheema);