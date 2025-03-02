const Product = require('../models/Product');

// Create a product (from API or CSV upload)
const createProduct = async (req, res) => {
  const { product_name, category, price, stock } = req.body;
  try {
    const product = new Product({ product_name, category, price, stock, user: req.userId });
    await product.save();
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Retrieve products (with pagination & filtering)
const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
  const filter = { user: req.userId }; // Only fetch products for the logged-in user

  // Add filters if provided
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  try {
    const products = await Product.find(filter)
      .skip((page - 1) * limit) // Pagination
      .limit(parseInt(limit));
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Update a product (only the owner can update)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, category, price, stock } = req.body;

  try {
    const product = await Product.findOne({ _id: id, user: req.userId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    product.product_name = product_name || product.product_name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Delete a product (only the owner can delete)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ _id: id, user: req.userId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    return res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };