const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const{
    addPayment,
    viewPayment,
    viewAllPayment} = require('../Controller/paymentController')

router.post("/addPayment",addPayment)
router.get('/getPayment',viewPayment)
router.get('/allPayment/:apartmentNo',viewAllPayment)

module.exports = router