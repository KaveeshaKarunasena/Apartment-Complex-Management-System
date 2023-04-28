const productRouter = require('express').Router()
const productCtrl = require('../Controller/productController')

productRouter.route('/products')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct)

productRouter.route('/products/:id')
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct)

  module.exports = productRouter;