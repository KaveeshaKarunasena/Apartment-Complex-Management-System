var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const { response } = require('../app');
const apartmentModel = require('../modles/apartment-model')

router.post('/add',(req,res,next) =>{

    let newApartment = new apartmentModel({

        apartmentno : req.body.apartmentno,
        floor : req.body.floor,
        buildingNo : req.body.buildingNo,
        type : req.body.type,
        status: req.body.status,
        ownersName: req.body.ownersName,
        count: req.body.count

    });

    newApartment.save(function(err,newApartment){

        if(err)
        res.send(err);
        else
        res.send({status:200,message:"ApartmentS Added Successfully",cusObj: newApartment})
    });

});


router.get('/view', function(req, res, next) {


    apartmentModel.find()
    .then(apartmest => res.json(apartmest))
    .catch(err => res.status(404).json({ notfound: 'No Apartment found' }));
  
  });

  router.get('/getById/:id',function(req, res, next){

    let id = req.params.id;
    apartmentModel.findById(id,(err,apartmentModel)=>{
      if(err){
        return res.status(400).json({success:false, err});

      }

      return res.status(200).json({
        success:true,
        apartmentModel
      });

    });
    

  })


  



router.put('/update/:_id', function(req, res, next) {

    const id = req.params._id;
    const Apartmentno = req.body.apartmentno;
    const Floor = req.body.floor;
    const BuildingNo = req.body.buildingNo;
    const Type = req.body.type;
    const Status = req.body.status;
    const OwnersName = req.body.ownersName;
    
   
    apartmentModel.findOneAndUpdate({_id:id},{apartmentno:Apartmentno, floor:Floor, buildingNo: BuildingNo,
        type:Type ,status:Status, ownersName: OwnersName },function(err,response){
  
      if(err)
      res.send(err);
      else
      res.send({status:200,message:"Apartment updated",apartment: response});
  
  });
})

  router.delete('/delete/:_id', function(req, res, next) {

    const id= req.params._id;
   
    apartmentModel.findByIdAndDelete(id,function(err,response){
  
      if(err)
      res.send(err);
      else
      res.send({status:200,message:"Apartment deleted",apartment: response});
  
  })

  })






module.exports = router