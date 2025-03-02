const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a product
router.post('/products', authMiddleware, createProduct);

// Retrieve products (with pagination & filtering)
router.get('/products', authMiddleware, getProducts);

// Update a product
router.put('/products/:id', authMiddleware, updateProduct);

// Delete a product
router.delete('/products/:id', authMiddleware, deleteProduct);

module.exports = router;