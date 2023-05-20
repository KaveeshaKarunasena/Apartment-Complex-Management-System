const router = require('express').Router();
const {
  newServiceProvider,
  viewServiceProvider,
  updateServiceProvider,
  deleteServiceProvider,
  viewSingleProvider,
  getServiceProviderNames,
  getCommissionByCategory,
  getServicePayment,
  getManagerStatistics,
  getEmployeeStatistics
} = require('../Controller/serviceProvider-Controller');
const uploadMiddleware = require('../service/MulterMiddleware');


// Route for adding a new Service Provider
// router.post('/add', uploadMiddleware.single("photo"), newServiceProvider);
router.post('/add',uploadMiddleware.single("photo"), newServiceProvider);

// Route for getting all the service providers
router.get('/', viewServiceProvider);

// Route for updating a service provider
router.put('/update/:id', updateServiceProvider);

// Route for deleting a service provider
router.delete('/delete/:id', deleteServiceProvider);

//Route for getting a specific service provider
router.get('/get/:id', viewSingleProvider);

//Route for getting service provider names
router.get('/getServiceProviderNames', getServiceProviderNames);

//Route for getting commission by category
router.get('/getCommissionByCategory',getCommissionByCategory);

//Route for getting payments made to service providers
router.get('/getServicePayment', getServicePayment);

router.get('/getManagerStatistics',  getManagerStatistics);
router.get('/getEmployeeStatistics', getEmployeeStatistics)
router.get('/getServicePayment/:year', getServicePayment)

module.exports = router;
