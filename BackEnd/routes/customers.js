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
const{
  addCart,
  getCart,
  deleteCart
}= require('../Controller/Cart');
router.post("/add",newSignUp);

router.get('/get', authGuard, viewProfileById);

router.get('/getCustomer/:id', viewCustomer);

router.put('/update/:id', updateProfileById);

router.post("/login",login);
//router.delete('/delete/:id', deleteProfile);

router.get('/', viewProfiles);
router.put("/upload/:id",uploadMiddleware.single("photo"),upload)

router.delete("/delete/:id/photo",deleteProfilePic);

router.put('/recoverypassword', resetPassword);

// add to cart route
router.put('/addcart', addCart);
router.get('/getCart', getCart);
router.delete('/deleteItem/:id/:itemId', deleteCart);
router.put("/recoverypassword/:email",resetPassword);


module.exports = router;
