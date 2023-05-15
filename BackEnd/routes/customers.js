const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authGuard  = require('../Utils/authGuard')
const uploadMiddleware = require('../service/MulterMiddleware')

const{
    newSignUp,
    login,
    viewProfileById,
    updateProfileById,
    deleteProfilePic,
    viewProfiles,
    resetPassword,
    viewCustomer,
    upload
} = require('../Controller/coustomerController');

router.post("/add",newSignUp);

router.post("/login",login);

router.get("/get",authGuard,viewProfileById);

router.get("/getCustomer/:id",viewCustomer);

router.put("/update/:id",updateProfileById);

router.put("/upload/:id",uploadMiddleware.single("photo"),upload)

router.delete("/delete/:id/photo",deleteProfilePic);

router.get("/",viewProfiles);

router.put("/recoverypassword",resetPassword);

module.exports= router;