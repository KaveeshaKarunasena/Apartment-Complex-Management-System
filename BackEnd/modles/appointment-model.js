const mongoose = require("mongoose");

const appointmentSchema =  mongoose.Schema({

    ownersName:{
        required:true,
        type:String
    },
    serviceType:{
        required:true,
        type:String
    },
    contactNo:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date
    },
    time:{
        required:true,
        type:String
    }
},{timestamps:true})

const  Appointment = mongoose.model("Appointment",  appointmentSchema);
module.exports =  Appointment;