var mongoose = require("mongoose");

var maintenanceSchema = mongoose.Schema({

    amount: Number,
    description : String,
    date : Date
})

var  maintenanceModel = mongoose.model("Maintenance",  maintenanceSchema);
 module.exports =  maintenanceModel;