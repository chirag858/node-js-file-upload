const Joi = require('joi');

// Validation schema for user registration
const registerSchema = Joi.object({
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };