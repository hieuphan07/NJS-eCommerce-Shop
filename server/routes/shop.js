const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');
const { isAuth } = require('../middleware/auth');

router.get('/products', productController.getProducts);

router.get('/products/:productId', productController.getProduct);

router.post('/create-order', isAuth, productController.postOrder);

router.get('/ordered-products', productController.getOrderedProducts);

router.get('/orders/:userId', isAuth, productController.getOrder);

module.exports = router;
