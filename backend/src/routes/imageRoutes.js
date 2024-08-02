const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, deleteProductAndImage } = require('../controllers/imageController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/products', upload.single('image'), uploadImage);
router.delete('/products/:id', deleteProductAndImage);

module.exports = router;