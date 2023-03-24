const mongoose = require("mongoose");

const maintenanceSchema = mongoose.Schema({

    apartmentNo:  {
        type :String,
        required :true
    },
  
    amount:  {
        type :Number,
        required :true
    },
    description : {
        type :String,
        required :true
    },
    date : {
        type :Date,
        required :true
    }
})

const  maintenanceModel = mongoose.model("Maintenance",  maintenanceSchema);
 module.exports =  maintenanceModel;