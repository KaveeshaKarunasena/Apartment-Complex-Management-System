const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    name:{
        type : String,
        require: true
    },
    apartmentNo:{
        type : String,
        require: true
    },
    nicNo:{
        type : String,
        require: true
    },
    phoneNo:{
        type : Number,
        require: true
    },
    email:{
        type : String,
        require: true
    },
    password:{
        type : String,
        require: true
    },
    photo:{
        type: String
    }

})

const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;