const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({

    StaffID: {
        type :String,
        required :true
    },
    Name :  {
        type :String,
        required :true
    },
    NIC :  {
        type :String,
        required :true
    },
    DOB :  {
        type :Date,
        required :true
    },
    Address:  {
        type :String,
        required :true
    },
    JobTitle:  {
        type :String,
        required :true
    },
    Department:  {
        type :String,
        required :true
    },
    ContactNumber: {
        type :String,
        required :true
    },
    BasicSalary:{
        type:Number,
        required:true
    },
    Allowance:{
        type:Number,
        required:true
    },
    Overtime:{
        type:Number,
        required:true
    }
})
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
 module.exports = EmployeeModel;