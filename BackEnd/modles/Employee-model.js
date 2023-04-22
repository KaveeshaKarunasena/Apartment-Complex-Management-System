const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({


    name :  {
        type :String,
        required :true
    },
    nic :  {
        type :String,
        required :true
    },
    dob :  {
        type :String,
        required :true
    },
    address:  {
        type :String,
        required :true
    },
    jobTitle:  {
        type :String,
        required :true
    },
    department:  {
        type :String,
        required :true
    },
    contactNumber: {
        type :String,
        required :true
    },
    basicSalary:{
        type:Number
        
    },
    allowance:{
        type:Number,
        required:true
    },
    overtime:{
        type:Number
        
    }
})
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
 module.exports = EmployeeModel;