const pool = require('../config/db');

const getAllCarts = async () => {
    const [rows] = await pool.query('SELECT * FROM carts');
    return rows;
};

const getCartById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM carts WHERE cart_id = ?', [id]);
    return rows[0];
};

const createCart = async (cart) => {
    const { user_id } = cart;
    const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [user_id]);
    return { cart_id: result.insertId, ...cart };
};

const updateCart = async (id, cart) => {
    const { user_id } = cart;
    await pool.query('UPDATE carts SET user_id = ? WHERE cart_id = ?', [user_id, id]);
    return getCartById(id);
};

const deleteCart = async (id) => {
    await pool.query('DELETE FROM carts WHERE cart_id = ?', [id]);
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};