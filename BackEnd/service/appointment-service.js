const Appointment = require('../modles/appointment-model');
const addAppointment = async (ownersName, serviceType, contactNo) => {
  const newAppointment = new Appointment({
    ownersName,
    serviceType,
    contactNo,
    createdAt: new Date(),
  });

  await newAppointment.save();

  const appointment = JSON.parse(JSON.stringify(newAppointment));

  return appointment;
};

module.exports = {
  addAppointment,
};
