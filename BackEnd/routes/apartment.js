const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validator = require('../Utils/validator');
const {
  newApartment,
  viewApartment,
  viewApartmentById,
  updateApartment,
  deleteApartment,
  getAllApartment
} = require('../Controller/apartment-Controller');
const authGuard = require('../Utils/authGuard');

router.post(
  '/add',
  validator([
    body('apartmentno').exists().isLength(3),
    body('floor').exists().isLength(2),
    body('buildingNo').isAlpha(),
    body('email').isEmail().normalizeEmail(),
  ]),authGuard,
  newApartment
);

router.get('/view', authGuard,viewApartment);

router.get('/getById/:id',authGuard, viewApartmentById);

router.put('/update/:_id',validator([
  body('email').isEmail().normalizeEmail(),
]), authGuard,updateApartment);

router.delete('/delete/:_id', authGuard,deleteApartment);
router.get('/allApartment',authGuard, getAllApartment)

module.exports = router;
