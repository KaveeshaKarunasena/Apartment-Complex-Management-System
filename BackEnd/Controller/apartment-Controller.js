const apartmentModel = require('../modles/apartment-model');
const apartmentService = require('../service/apartment.-service');

const newApartment = async (req, res) => {
  try {
    const { apartmentno, floor, buildingNo, type, status, ownersName, email } = req.body;

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
    .then(apartment => res.json(apartment))
    .catch(err => res.status(404).json({ notfound: 'No Apartment found' }));

  }catch(err){
    res.status(400).send({ err: err });
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

module.exports = {
  newApartment,
  viewApartment,
  viewApartmentById,
  updateApartment,
  deleteApartment,
  getAllApartment,
};
