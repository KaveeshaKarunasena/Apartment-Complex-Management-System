var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const { response } = require('../app');
const  maintenanceModel = require('../modles/maintenance-model')

router.post('/add',(req,res,next) =>{

    let newMaintenance = new maintenanceModel({

        amount: req.body.amount,
        description : req.body.description,
        date : req.body.date

    });

    newMaintenance.save(function(err,newMaintenance){

        if(err)
        res.send(err);
        else
        res.send({status:200,message:"Maintenance Added Successfully",Obj:newMaintenance })
    });

})


module.exports = router;