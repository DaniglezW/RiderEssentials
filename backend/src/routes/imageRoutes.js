const express = require('express');
const router = express.Router();
const { updateImage, updateUserImage, upload } = require('../controllers/imageController');

router.post('/products/:id/image', upload.single('image'), updateImage);
router.post('/users/:id/image', upload.single('image'), updateUserImage);

module.exports = router;