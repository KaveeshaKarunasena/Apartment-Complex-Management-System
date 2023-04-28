const Apartment = require('../modles/apartment-model');

const findApartmentByNo = async (apartmentNo) =>{

const foundApartment = await Apartment.findOne({apartmentno:apartmentNo})
  return foundApartment
}


const findApartmentByName = async (ownerName) =>{

  const foundApartment = await Apartment.findOne({ownersName:ownerName})
    return foundApartment
  }

  const findApartmentByEmail = async (ownerEmail) =>{

    const foundApartment = await Apartment.findOne({email:ownerEmail})
      return foundApartment
    }

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
    updateItem,
    findApartmentByNo,
    findApartmentByEmail,
    findApartmentByName
};