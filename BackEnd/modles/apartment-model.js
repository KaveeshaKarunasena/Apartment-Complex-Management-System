var mongoose = require("mongoose");

var apartmentSchema = mongoose.Schema({

    apartmentno : String,
    floor : Number,
    buildingNo : Number,
    type : String,
    status: String,
    ownersName: String,
    count: Number
})

var apartmentModel = mongoose.model("Apartment", apartmentSchema);
 module.exports = apartmentModel;