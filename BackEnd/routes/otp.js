const express = require('express');
const router = express.Router();
const {
    sendOTP,
    verifyOTP,
} = require('../Controller/otpController');

router.post("/otp",sendOTP);
router.post("/verifyOTP",verifyOTP);

module.exports= router;