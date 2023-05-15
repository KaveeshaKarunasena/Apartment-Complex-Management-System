const express = require('express');
const { body } = require('express-validator');
const validator = require('../Utils/validator');
const {
  getCost,
  addMaintenance,
  totalCostByDate,
  totalCost,
  totalCostByType,
  costByDetails
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
module.exports = router;
