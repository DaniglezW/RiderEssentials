// src/services/imageService.js
const fs = require('fs');
const path = require('path');

const deleteImage = (imagePath) => {
    fs.unlinkSync(path.resolve(imagePath));
};

module.exports = {
    deleteImage
};