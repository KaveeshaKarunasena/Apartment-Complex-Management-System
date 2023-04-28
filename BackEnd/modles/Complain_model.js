const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const complainSchema = new Schema ({
    owner_name : {
        type : String,
        required : true
    },
    complain: {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true,
        validate: {
            validator: function(email) {
                return validator.isEmail(email);
            },
            message: "Invalid email address"
        }
    },
    Select_Cat: {
        type : String,
        required : true
    },
    Status : {
        type : String,
        required : true
    },
    Complain_No : {
        type : Number,
        required : true
    },

    Contact_No : {
        type : Number,
        required : true
    }


});

const complain_Model = mongoose.model("complain",complainSchema);
module.exports=complain_Model;