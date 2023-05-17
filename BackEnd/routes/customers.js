const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
<<<<<<< HEAD
const authGuard = require('../Utils/authGuard');

const {
  newSignUp,
  login,
  viewProfileById,
  updateProfileById,
  deleteProfile,
  viewProfiles,
  resetPassword,
  viewCustomer,
} = require('../Controller/coustomerController');

const { addCart, getCart, deleteCart } = require('../Controller/Cart');

router.post('/add', newSignUp);

router.post('/login', login);
=======
const authGuard  = require('../Utils/authGuard')
const uploadMiddleware = require('../service/MulterMiddleware')

const{
    newSignUp,
    login,
    viewProfileById,
    updateProfileById,
    deleteProfile,
    viewProfiles,
    resetPassword,
    viewCustomer,
    upload
} = require('../Controller/coustomerController');

router.post("/add",newSignUp);
>>>>>>> 9e1e7a9bd814df01f97419af51e697b26f94739e

router.get('/get', authGuard, viewProfileById);

router.get('/getCustomer/:id', viewCustomer);

router.put('/update/:id', updateProfileById);

router.delete('/delete/:id', deleteProfile);

<<<<<<< HEAD
router.get('/', viewProfiles);
=======
router.put("/upload/:id",uploadMiddleware.single("photo"),upload)

router.delete("/delete/:id",deleteProfile);
>>>>>>> 9e1e7a9bd814df01f97419af51e697b26f94739e

router.put('/recoverypassword', resetPassword);

// add to cart route
router.put('/addcart', addCart);
router.get('/getCart', getCart);
router.delete('/deleteItem/:id/:itemId', deleteCart);

module.exports = router;
