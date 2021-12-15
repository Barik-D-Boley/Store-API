// Express Router Setup
const express = require('express');
const router = express.Router();

// Import Controllers
const { getAllProducts, deleteAllProducts, updateProduct, deleteProduct, createProduct, getProduct } = require('../controllers/products');

router.route('/').get(getAllProducts).delete(deleteAllProducts).post(createProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;