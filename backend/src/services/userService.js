const pool = require('../config/db');

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0];
};

const createUser = async (user) => {
    const { name, email, password_hash } = user;
    const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, password_hash]);
    return { user_id: result.insertId, ...user };
};

const updateUser = async (id, user) => {
    const { name, email, password_hash } = user;
    await pool.query('UPDATE users SET name = ?, email = ?, password_hash = ? WHERE user_id = ?', [name, email, password_hash, id]);
    return getUserById(id);
};

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};