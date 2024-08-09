const fs = require('fs');
const path = require('path');

/**
 * Devuelve la imagen del producto o la imagen por defecto si no hay imagen.
 * @param {string|null} imageUrl - El nombre del archivo de la imagen del producto.
 * @param {string} defaultImagePath - La ruta de la imagen por defecto.
 * @returns {Buffer} La imagen del producto o la imagen por defecto.
 */
const getImageOrDefault = (imageUrl, defaultImagePath) => {
  let imagePath;

  if (imageUrl == null) {
      imagePath = defaultImagePath;
  } else {
      imagePath = path.join(__dirname, '..', '..', 'public', 'images', imageUrl);
  }
  if (!fs.existsSync(imagePath)) {
      imagePath = defaultImagePath;
  }
  return fs.readFileSync(imagePath);
};

module.exports = {
  getImageOrDefault,
};