const { updateProductImage, updateUserImageService } = require('../services/imageService');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const updateImage = async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageBuffer = req.file.buffer;

  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const success = await updateProductImage(productId, imageBuffer);
    if (success) {
      res.status(200).json({ message: 'Product image updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product image:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updateUserImage = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageBuffer = req.file.buffer;

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const success = await updateUserImageService(userId, imageBuffer);
    if (success) {
      res.status(200).json({ message: 'User image updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user image:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
    updateImage,
    updateUserImage,
    upload,
};