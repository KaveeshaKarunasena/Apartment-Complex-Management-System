const Appointment = require('../modles/appointment-model')
const appointmentService = require('../service/appointment-service')

const createAppointment = async (req, res) => {

    try{

        const {ownersName,serviceType,contactNo,date,time} = req.body;
        const newAppointment = await appointmentService.addAppointment(ownersName,serviceType,contactNo,date,time)
        res.status(200).send(newAppointment);

    }catch(err){
        res.status(400).send({err:err});

    }
    
  
  };

const viewAppointment = async (req, res) => {

    try{
        Appointment
        .find()
        .then(Appointment => res.json(Appointment))
        .catch(() => res.status(404).json({ err: 'Appointment Not found' }));

    }catch(err){
        res.status(400).send({ err: err });

    }
}

const deleteAppointment = async(req,res)=> {

    try{

        const {id} = req.body 

        await Appointment.findByIdAndDelete({_id:id})
        .then(() =>res.status(404).json({ err: 'Appointment cancled' }))
        .catch(() => res.status(404).json({ err: 'Appointment Not found' }));

    }catch(err){
        res.status(400).send({ err: err });
    }

}

  module.exports = {
    createAppointment,
    viewAppointment,
    deleteAppointment
  };