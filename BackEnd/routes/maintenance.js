const express = require('express');
const { body } = require('express-validator');
const validator = require('../Utils/validator');
const {
  getCost,
  addMaintenance,
  totalCostByDate,
  totalCost,
  totalCostByType,
  costByDetails,
  getIncome,
  getMaintenancCount,
 
} = require('../Controller/maintenance-Controller');
const authGuard = require('../Utils/authGuard');
const router = express.Router();

router.post(
  '/add',
  validator([body('amount').isCurrency(), body('date').isDate()]),
  authGuard,
  addMaintenance
);

router.get('/getCost', getCost);
router.get('/getTotalByDate', totalCostByDate);
router.get('/getTotalCost', totalCost);
router.get('/getTotalByType', totalCostByType);
router.get('/costDetails', costByDetails);
// router.get('/apartmentCount', getApartmentCount);
// router.get('/registeredApartments',getRegisteredApartment);
router.get('/getIncome', getIncome);
router.get('/maintenanceCount', getMaintenancCount);
// router.get('/pendingCount', getPendingApartment);


module.exports = router;
