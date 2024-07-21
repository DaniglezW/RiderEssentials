const express = require('express');
const router = express.Router();
const upload = require('../upload');
const { uploadImage, deleteProductAndImage } = require('../controllers/imageController');

router.post('/products', upload.single('image'), uploadImage);
router.delete('/products/:id', deleteProductAndImage);

module.exports = router;