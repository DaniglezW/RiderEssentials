// src/controllers/imageController.js
const { deleteImage } = require('../services/imageService');
const pool = require('./config/db');

const uploadImage = async (req, res) => {
    const { name, description, price, category_id } = req.body;
    const image_url = `/uploads/${req.file.filename}`;

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, image_url, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, image_url, category_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProductAndImage = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT image_url FROM products WHERE product_id = $1', [id]);
        const image_url = result.rows[0].image_url;

        deleteImage(`.${image_url}`);

        await pool.query('DELETE FROM products WHERE product_id = $1', [id]);

        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    uploadImage,
    deleteProductAndImage
};