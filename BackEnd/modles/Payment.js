const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    apartmentNo:{
        type : String,
        required: true
    },
    category:{
        type : String,
        required: true
    },
    payeeId:{
        type:String
    },
    amount:{
        type : Number,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }


})

const Payment = mongoose.model("Payment",paymentSchema);
module.exports = Payment;