const express = require('express');
const upload = require('../middleware/upload');
const { uploadCSV } = require('../controllers/uploadController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadCSV);

module.exports = router;