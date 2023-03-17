const router = require('express').Router();
let ServiceProvider = require('../modles/service-provider');

// Route for adding a new Service Provider
router.route('/add').post((req, res, next) => {
  const companyName = req.body.companyName;
  const serviceType = req.body.serviceType;
  const location = req.body.location;
  const contactNumber = req.body.contactNumber;

  const newServiceProvider = new ServiceProvider({
    companyName,
    serviceType,
    location,
    contactNumber,
  });

  newServiceProvider
    .save()
    .then(() => {
      res.json('New Service Provider Added');
    })
    
    .catch(err => {
      console.log(error);
    });
});

// Route for getting all the service providers
router.route('/').get((req, res, next) => {
  ServiceProvider.find()
    .then(serviceProviders => {
      res.json(serviceProviders);
    })
    .catch(err => {
      console.log(err);
    });
});

// Route for updating a service provider
router.route('/update/:id').put(async (req, res, next) => {
  let serviceProviderId = req.params.id;
  const { companyName, serviceType, location, contactNumber } = req.body;

  const updateServiceProvider = {
    companyName,
    serviceType,
    location,
    contactNumber,
  };

  const update = await ServiceProvider.findByIdAndUpdate(
    serviceProviderId,
    updateServiceProvider
  )
    .then(() => {
      res.status(200).send({ status: 'Service Provider Updated' });
    })
    .catch(error => {
      res
        .status(500)
        .send({ status: 'Error with updating data', error: error.message });
    });
});

// Route for deleting a service provider
router.route('/delete/:id').delete(async (req, res, next) => {
  const serviceProviderId = req.params.id;

  await ServiceProvider.findByIdAndRemove(serviceProviderId)
    .then(() => {
      res.status(200).send({ status: 'Service Provide deleted' });
    })
    .catch(error => {
      res.status(500).send({
        status: 'Error with deleting service provider',
        error: error.message,
      });
    });
});

//Route for getting a specific service provider
router.route('/get/:id').get(async (req, res, next) => {
  const serviceProviderId = req.params.id;

  await ServiceProvider.findById(serviceProviderId)
    .then(serviceProvider => {
      res
        .status(200)
        .send({
          status: 'Service Provider fetched',
          serviceProvider: serviceProvider,
        });
    })
    .catch(error => {
      res
        .status(500)
        .send({
          status: 'Error with getting service provider',
          error: error.message,
        });
    });
});

module.exports = router;
