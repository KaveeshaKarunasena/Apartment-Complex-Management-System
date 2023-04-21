const { Router } = require('express');
const uploadMiddleware = require('../service/MulterMiddleware');
const uploadModel = require('../modles/uploadModel');

const router = Router();

router.get('/api/get', async (req, res) => {
  const allPhotos = await uploadModel.find();
  res.send(allPhotos);
});

router.post('/api/save', uploadMiddleware.single("photo"), (req, res) => {

  const photo = req.file.filename;

  uploadModel
    .create({ photo })
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

module.exports = router;


