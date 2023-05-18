const productRouter = require('express').Router()

const productCtrl = require('../Controller/productController')

productRouter.route('/products')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct)

productRouter.route('/products/:id')
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct)


 // router.get('/getCost', getCost);
  //router.get('/getTotalByDate', totalCostByDate);
  productRouter.get('/getTotalFee', productCtrl.totalFee);
  // router.get('/getTitle', titleMake);
  //router.get('/getTotalByType', totalCostByType);
  //router.get('/costDetails', costByDetails);

  module.exports = productRouter;