// src/services/imageService.js
const db = require('../config/db');

const updateProductImage = async (productId, imageBuffer) => {
  try {
    const [rows] = await db.execute(
      'UPDATE products SET image = ? WHERE product_id = ?',
      [imageBuffer, productId]
    );
    return rows.affectedRows > 0;
  } catch (error) {
    console.error('Error updating product image:', error);
    throw error;
  }
};

const updateUserImageService = async (productId, imageBuffer) => {
  try {
    const [rows] = await db.execute(
      'UPDATE users SET image = ? WHERE user_id = ?',
      [imageBuffer, productId]
    );
    return rows.affectedRows > 0;
  } catch (error) {
    console.error('Error updating user image:', error);
    throw error;
  }
};

module.exports = {
  updateProductImage,
  updateUserImageService
};