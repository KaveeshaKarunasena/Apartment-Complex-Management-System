const express = require('express');
const { createAppointment,viewAppointment,deleteAppointment } = require('../Controller/appointment-Controller');
const appointmentRouter = express.Router();


appointmentRouter.post('/addAppointment', createAppointment)
appointmentRouter.get('/getAllAppointment', viewAppointment)
appointmentRouter.delete('/cancelAppointment', deleteAppointment)

module.exports = appointmentRouter



