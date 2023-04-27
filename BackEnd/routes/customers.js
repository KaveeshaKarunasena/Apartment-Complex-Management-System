const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authGuard  = require('../Utils/authGuard')

const{
    newSignUp,
    login,
    viewProfileById,
    updateProfileById,
    deleteProfile,
    viewProfiles,
    resetPassword,
} = require('../Controller/coustomerController');



router.post("/add",newSignUp);

router.post("/login",login);

router.get("/get",authGuard,viewProfileById);

router.put("/update/:id",updateProfileById);

router.delete("/delete/:id",deleteProfile);

router.get("/",viewProfiles);

router.put("/recoverypassword",resetPassword);

module.exports= router;