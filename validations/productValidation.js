const Joi = require('joi');

// Validation schema for creating/updating a product
const productSchema = Joi.object({
  product_name: Joi.string().min(3).max(100).required(),
  category: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
});

module.exports = productSchema;