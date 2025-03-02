const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email : email });
    if (user) {
     return res.status(304).json({ message: 'User already exist' });
    }
    const newuser = new User({ email, password });
    await newuser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email : email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };