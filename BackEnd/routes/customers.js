const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
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

router.get('/get', authGuard, viewProfileById);

router.get('/getCustomer/:id', viewCustomer);

router.put('/update/:id', updateProfileById);

router.delete('/delete/:id', deleteProfile);

router.get('/', viewProfiles);

router.put('/recoverypassword', resetPassword);

// add to cart route
router.put('/addcart', addCart);
router.get('/getCart', getCart);
router.delete('/deleteItem/:id/:itemId', deleteCart);

module.exports = router;
