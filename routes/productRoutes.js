const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/products', authMiddleware, validateProduct, createProduct);
router.get('/products', authMiddleware, getProducts);
router.put('/products/:id', authMiddleware, validateProduct, updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);

module.exports = router;