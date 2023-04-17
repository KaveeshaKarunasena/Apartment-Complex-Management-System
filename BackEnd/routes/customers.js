const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const{
    newSignUp,
    login,
    viewProfileById,
    updateProfileById,
    deleteProfile,
    viewProfiles,
} = require('../Controller/coustomerController');



router.post("/add",newSignUp);

router.post("/login",login);

router.get("/get/:id",viewProfileById);

router.put("/update/:id",updateProfileById);

router.delete("/delete/:id",deleteProfile);

router.get("/",viewProfiles);

module.exports= router;