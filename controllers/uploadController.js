const Product = require('../models/Product');
const parseCSV = require('../utils/csvParser');
const fs = require('fs');
const path = require('path');

const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = path.join(__dirname, '../', req.file.path);
    const products = await parseCSV(filePath);

    // Add the user ID to each product
    const productsWithUser = products.map((product) => ({
      ...product,
      user: req.userId,
    }));

    // Save products to the database
    await Product.insertMany(productsWithUser);

    // Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    res.status(201).json({ message: 'CSV file processed successfully', products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { uploadCSV };