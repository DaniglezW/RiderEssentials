const pool = require('../config/db');

const getAllProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
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
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};