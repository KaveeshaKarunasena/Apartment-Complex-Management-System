const apartmentModel = require('../modles/apartment-model');

const newApartment = (req, res) => {
  let newApartment = new apartmentModel({
    apartmentno: req.body.apartmentno,
    floor: req.body.floor,
    buildingNo: req.body.buildingNo,
    type: req.body.type,
    status: req.body.status,
    ownersName: req.body.ownersName,
    email: req.body.email,
  });

  newApartment.save(function (err, newApartment) {
    if (err) res.send(err);
    else
      res.send({
        status: 200,
        message: 'Apartments Added Successfully',
        cusObj: newApartment,
      });
  });
};

const viewApartment = async (req, res) => {
  apartmentModel
    .find()
    .then(apartment => res.json(apartment))
    .catch(err => res.status(404).json({ notfound: 'No Apartment found' }));
};

const viewApartmentById = async (req, res) => {
  let id = req.params.id;
  apartmentModel.findById(id, (err, apartmentModel) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      apartmentModel,
    });
  });
};

const updateApartment = async (req, res) => {

  const id = req.params._id;
  const Apartmentno = req.body.apartmentno;
  const Floor = req.body.floor;
  const BuildingNo = req.body.buildingNo;
  const Type = req.body.type;
  const Status = req.body.status;
  const OwnersName = req.body.ownersName;

  apartmentModel.findOneAndUpdate(
    { _id: id },
    {
      apartmentno: Apartmentno,
      floor: Floor,
      buildingNo: BuildingNo,
      type: Type,
      status: Status,
      ownersName: OwnersName,
    },
    function (err, response) {
      if (err) res.send(err);
      else
        res.send({
          status: 200,
          message: 'Apartment updated',
          apartment: response,
        });
    }
  );
};

const deleteApartment = async (req, res) => {
  const id = req.params._id;

  apartmentModel.findByIdAndDelete(id, function (err, response) {
    if (err) res.send(err);
    else
      res.send({
        status: 200,
        message: 'Apartment deleted',
        apartment: response,
      });
  });
};

const getAllApartment =  async(req,res) =>{

  await apartmentModel.aggregate(
    [
      {
        '$group': {
          '_id': '$apartmentno'
        }
      }
    ]
   
).exec((err,data) =>{

  if(data){
     res.status(200).json(data)
}
    else{
       res.status(404).json({ err: err})
    }
   
    
})
}

module.exports = {
  newApartment,
  viewApartment,
  viewApartmentById,
  updateApartment,
  deleteApartment,
  getAllApartment
};
