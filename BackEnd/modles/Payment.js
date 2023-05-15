const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    apartmentNo:{
        type : String,
        require: true
    },
    category:{
        type : String,
        require: true
    },
    payee:{
        type:String,
    },
    amount:{
        type : String,
        require: true
    }

})

const Payment = mongoose.model("Payment",paymentSchema);
module.exports = Payment;