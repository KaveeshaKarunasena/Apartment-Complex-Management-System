const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({

    apartmentno : {
        type :String,
        required :true
    },
    floor :  {
        type :Number,
        required :true
    },
    buildingNo :  {
        type :String,
        required :true
    },
    type :  {
        type :String,
        required :true
    },
    status:  {
        type :String,
        required :true
    },
    ownersName:  {
        type :String,
        required :true
    },
    email:  {
        type :String,
        required :true
    }
})

const apartmentModel = mongoose.model("Apartment", apartmentSchema);
 module.exports = apartmentModel;