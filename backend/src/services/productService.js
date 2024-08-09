const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const { getImageOrDefault } = require('../utils/utils.js');

const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  
  const defaultImagePath = path.join(__dirname, '..', '..', 'public', 'images', 'default.jpg');
  const products = rows.map(product => {
    const image = getImageOrDefault(product.image_url, defaultImagePath);
    return {
        ...product,
        image: image
    };
});

  return products;
};

const getProductsByPriceRange = async (minPrice, maxPrice) => {
  const [rows] = await pool.query(
      'SELECT * FROM products WHERE price BETWEEN ? AND ?',
      [minPrice, maxPrice]
  );

  const defaultImagePath = path.join(__dirname, '..', '..', 'public', 'images', 'default.png');
  const defaultImage = fs.readFileSync(defaultImagePath);

  const products = rows.map(product => {
      if (product.image_url) {
          product.image = defaultImage;
      }
      return {
          ...product,
          image: Buffer.from(product.image)
      };
  });
  return products;
};


const getProductById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);
    return rows[0];
};

const createProduct = async (product) => {
    const { name, description, price, image_url, category_id } = product;
    const [result] = await pool.query('INSERT INTO products (name, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?)', [name, description, price, image_url, category_id]);
    return { product_id: result.insertId, ...product };
};

const updateProduct = async (id, product) => {
    const { name, description, price, image_url, category_id } = product;
    await pool.query('UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category_id = ? WHERE product_id = ?', [name, description, price, image_url, category_id, id]);
    return getProductById(id);
};

const deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE product_id = ?', [id]);
};

module.exports = {
    getAllProducts,
    getProductsByPriceRange,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};