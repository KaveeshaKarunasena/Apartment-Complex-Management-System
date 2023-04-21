const  maintenanceModel = require('../modles/maintenance-model')

const addMaintenance = async(req,res) =>{
    let newMaintenance = new maintenanceModel({
        apartmentNo: req.body.apartmentNo,
        amount: req.body.amount,
        description : req.body.description,
        date :req.body.date 

    });

    newMaintenance.save(function(err,newMaintenance){

        if(err)
        res.send(err);
        else
        res.send({status:200,message:"Maintenance Added Successfully",Obj:newMaintenance })
    });

};


const getCost = async (req, res) => {
    maintenanceModel
      .find()
      .then(maintenance => res.json(maintenance))
      .catch(err => res.status(404).json({ notfound: 'No maintenance found' }));
  };


  const totalCostByDate = async(req,res) =>{

    await maintenanceModel.aggregate(
        [
            {
              '$match': {}
            }, {
              '$group': {
                '_id': '$date', 
                'totalCost': {
                  '$sum': '$amount'
                }
              }
            }
          ]
    ).exec((err,totalCost) =>{

        if(err){
            res.status(404).json({ err})
        }
        if(totalCost){
            res.status(200).json({ totalCost})
        }
    })
  };

  const totalCost = async(req,res) =>{

    await maintenanceModel.aggregate(
        [
            {
              '$match': {}
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ]
    ).exec((err,total) =>{

        if(err){
            res.status(404).json({ err})
        }
        if(total){
            res.status(200).json({ total})
        }
    })
  };

  const totalCostByType = async(req,res) =>{

    await maintenanceModel.aggregate(
      [
        {
          '$lookup': {
            'from': 'apartments', 
            'localField': 'apartmentNo', 
            'foreignField': 'apartmentno', 
            'as': 'apartment'
          }
        }, 
         {
          '$group': {
            '_id': {
              '$arrayElemAt': [
                '$apartment.type', 0
              ]
            }, 
            'total': {
              '$sum': '$amount'
            }
          }
        }
      ]).exec((err,total) =>{

        if(err){
            res.status(404).json({ err})
        }
        if(total){
            res.status(200).json({ total})
        }
    })
  };

  const costByDetails = async(req,res) =>{

    await maintenanceModel.aggregate(
      [
        {
          '$lookup': {
            'from': 'apartments', 
            'localField': 'apartmentNo', 
            'foreignField': 'apartmentno', 
            'as': 'apartments'
          }
        }, {
          '$group': {
            '_id': {
              '$arrayElemAt': [
                '$apartments.apartmentno', 0
              ]
            }, 
            'type': {
              '$first': {
                '$arrayElemAt': [
                  '$apartments.type', 0
                ]
              }
            }, 
            'name': {
              '$first': {
                '$arrayElemAt': [
                  '$apartments.ownersName', 0
                ]
              }
            }, 
            'description': {
              '$first': '$description'
            }, 
            'total': {
              '$sum': '$amount'
            }, 
            'date': {
              '$first': '$date'
            }
          }
        }
      ]).exec((err,details) =>{

        if(err){
            res.status(404).json({ err})
        }
        if(details){
            res.status(200).json({ details})
        }
    })
  }



module.exports = {addMaintenance,getCost, totalCostByDate,totalCost,totalCostByType,costByDetails}

