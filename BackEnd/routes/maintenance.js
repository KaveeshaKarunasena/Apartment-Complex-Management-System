const express = require('express');
const { body } = require('express-validator');
const validator = require('../Utils/validator');
const {
  getCost,
  addMaintenance,
  totalCostByDate,
  totalCost
} = require('../Controller/maintenance-Controller');
const router = express.Router();

router.post(
  '/add',
  validator([body('amount').isCurrency(), body('date').isDate()]),
  addMaintenance
);

router.get('/getCost', getCost);
router.get('/getTotalByDate', totalCostByDate);
router.get('/getTotalCost', totalCost);
module.exports = router;
