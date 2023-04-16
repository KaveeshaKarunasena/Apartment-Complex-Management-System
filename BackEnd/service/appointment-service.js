const Appointment = require('../modles/appointment-model')

export const addAppointment = async(req, res)=>{

    const newAppointment = new Appointment({
        ownersName,
        serviceType,
        contactNo,
        date,
        time
    })
    await newAppointment.save();
    const appointment =  JSON.parse(JSON.stringify(newAppointment));
    return appointment 
}