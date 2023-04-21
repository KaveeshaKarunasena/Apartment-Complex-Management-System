const Apartment = require('../modles/apartment-model');

const createApartment = async (apartmentno,floor,buildingNo,type,status,ownersName,email) => {
  const newApartment = new Apartment({
    apartmentno,
    floor,
    buildingNo,
    type,
    status,
    ownersName,
    email
  });

  await newApartment.save();
  const apartmentItem = JSON.parse(JSON.stringify(newApartment));
  return apartmentItem;
};

const updateItem = async (_id,apartmentno, floor, buildingNo, type, status, ownersName, email) => {

    console.log(_id)
    const updatedApartment = await apartmentModel.findOneAndUpdate(
        { _id: _id },
        {  
            apartmentno:apartmentno,
            floor:floor,
            buildingNo:buildingNo,
          type: type,
          status: status,
          ownersName: ownersName,
          email:email
        },
    )
  console.log(updatedApartment)
    const apartmentItem = JSON.parse(JSON.stringify(updatedApartment));
    return apartmentItem;
  };

module.exports = {
    createApartment,
    updateItem
};