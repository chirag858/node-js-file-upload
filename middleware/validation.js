const { registerSchema, loginSchema } = require('../validations/userValidations');
const productSchema = require('../validations/productValidation');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegister: validateRequest(registerSchema),
  validateLogin: validateRequest(loginSchema),
  validateProduct: validateRequest(productSchema),
};