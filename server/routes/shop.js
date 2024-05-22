const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');
const { isAuth } = require('../middleware/auth');

// get ALL products
router.get('/products', productController.getProducts);

// get product
router.get('/products/:productId', productController.getProduct);

// create new order
router.post('/create-order', isAuth, productController.postOrder);

// get orders by user
router.get('/orders/:userId', isAuth, productController.getOrders);

// get order detail
router.get('/orders/:userId/:orderId', isAuth, productController.getOrder);

// render ordered products to test UI send to emal
router.get('/ordered-products', productController.getOrderedProducts);

module.exports = router;
