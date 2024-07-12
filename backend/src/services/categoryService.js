const pool = require('../config/db');

const getAllCategories = async () => {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows;
};

const getCategoryById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id]);
    return rows[0];
};

const createCategory = async (category) => {
    const { name, description } = category;
    const [result] = await pool.query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
    return { category_id: result.insertId, ...category };
};

const updateCategory = async (id, category) => {
    const { name, description } = category;
    await pool.query('UPDATE categories SET name = ?, description = ? WHERE category_id = ?', [name, description, id]);
    return getCategoryById(id);
};

const deleteCategory = async (id) => {
    await pool.query('DELETE FROM categories WHERE category_id = ?', [id]);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};