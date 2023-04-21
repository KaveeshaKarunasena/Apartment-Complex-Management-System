const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    name:{
        type : String,
        require: true
    },
    apartmentNO:{
        type : String,
        require: true
    },
    nicNO:{
        type : String,
        require: true
    },
    phoneNO:{
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
    }
    // image:{
    //     data:Buffer,
    //     contentType:String
    // }

})

const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;