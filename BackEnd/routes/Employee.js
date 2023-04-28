const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validator = require('../Utils/validator');
const {
  newEmployee,
  viewEmployee,
  viewEmployeeById,
  viewEmployeeByname,
  updateEmployee,
  DeleteEmployee,
} = require('../Controller/Employee-Controller');

router.post('/add', newEmployee);
router.post(
  '/add',
  validator([
    body('nic').exists().isLength(12),
    body('contactNumber').exists().isLength(9),
    
  ]),
  newEmployee
);
router.get('/view', viewEmployee);

router.get('/getById/:id', viewEmployeeById);

router.get('/getById/:name',viewEmployeeByname);

router.put('/update/:_id', updateEmployee);

router.delete('/delete/:id', DeleteEmployee);

module.exports = router;