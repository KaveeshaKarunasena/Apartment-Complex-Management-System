const apartmentModel = require('../modles/apartment-model');
const apartmentService = require('../service/apartment.-service');

const newApartment = async (req, res) => {
  try {
    const { apartmentno, floor, buildingNo, type, status, ownersName, email } = req.body;

    console.log(apartmentno)


    const existApartment = await apartmentService.findApartmentByNo(apartmentno);
   
  if(existApartment){
    return res.status(401).send({
      err: 'Apartment Already Exist',
    });
  }

  const existOwner = await apartmentService.findApartmentByName(ownersName);
   
  if(existOwner){
    return res.status(401).send({
      err: 'Owner Already Exist',
    });
  }



  const existEmail = await apartmentService.findApartmentByEmail(email);
   
  if(existEmail){
    return res.status(401).send({
      err: 'Email Already Exist',
    });
  }

    const createdApartment = await apartmentService.createApartment(
      apartmentno,
      floor,
      buildingNo,
      type,
      status,
      ownersName,
      email
    );
    res.status(200).json(createdApartment);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const viewApartment = async (req, res) => {

  try{
    await apartmentModel
    .find()
    .then(apartment => res.status(200).json(apartment))

  }catch(err){
    res.status(404).send({ err: 'No Apartment found' });
  }
  
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
  const {type, status, ownersName, email} = req.body

  apartmentModel.findOneAndUpdate(
    { _id: id },
    {
      type: type,
      status: status,
      ownersName: ownersName,
      email:email 
    },
    function (err, response) {
      if (err) res.send({err:'Not Updated'});
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
        message: 'Apartment delete',
        apartment: response,
      });
  });
};

const getAllApartment = async (req, res) => {
  await apartmentModel
    .aggregate([
      {
        $group: {
          _id: '$apartmentno',
        },
      },
    ])
    .exec((err, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ err: err });
      }
    });
};

const getRegisteredApartment = async (req,res) => {
  await apartmentModel
    .aggregate([
      {
        $match: {
          status: 'Owned',
        },
       
      },
       {
          $count : 'string'
        },
    ])
    .exec((err, details) => {
      if (err) {
        res.status(404).json({ err });
      }
      if (details) {
        res.status(200).json({ details });
      }
    });
};

const getPendingApartment = async (req,res) => {
  await apartmentModel
    .aggregate([
      {
        $match: {
          status: 'Pending',
        },
       
      },
       {
          $count : 'pend'
        },
    ])
    .exec((err, details) => {
      if (err) {
        res.status(404).json({ err });
      }
      if (details) {
        res.status(200).json({ details });
      }
    });
};
const getApartmentCount = async (req,res) => {
  await apartmentModel
    .aggregate([
      {
        $count: 'apartmentno',
      },
    ])
    .exec((err, count) => {
      if (err) {
        res.status(404).json({ err });
      }
      if (count) {
        res.status(200).json({ count });
      }
    });
};


module.exports = {
  newApartment,
  viewApartment,
  viewApartmentById,
  updateApartment,
  deleteApartment,
  getAllApartment,
  getRegisteredApartment,
  getPendingApartment,
  getApartmentCount
};
