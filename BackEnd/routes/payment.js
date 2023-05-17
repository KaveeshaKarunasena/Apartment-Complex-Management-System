const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const{
    addPayment,
    viewPayment} = require('../Controller/paymentController')

router.post("/addPayment",addPayment)
router.get('/getPayment/:apartmentNo',viewPayment)

module.exports = router