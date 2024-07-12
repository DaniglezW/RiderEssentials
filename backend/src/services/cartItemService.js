const pool = require('../config/db');

const getAllCartItems = async () => {
    const [rows] = await pool.query('SELECT * FROM cart_items');
    return rows;
};

const getCartItemById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM cart_items WHERE cart_item_id = ?', [id]);
    return rows[0];
};

const createCartItem = async (cartItem) => {
    const { cart_id, product_id, quantity } = cartItem;
    const [result] = await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cart_id, product_id, quantity]);
    return { cart_item_id: result.insertId, ...cartItem };
};

const updateCartItem = async (id, cartItem) => {
    const { cart_id, product_id, quantity } = cartItem;
    await pool.query('UPDATE cart_items SET cart_id = ?, product_id = ?, quantity = ? WHERE cart_item_id = ?', [cart_id, product_id, quantity, id]);
    return getCartItemById(id);
};

const deleteCartItem = async (id) => {
    await pool.query('DELETE FROM cart_items WHERE cart_item_id = ?', [id]);
};

module.exports = {
    getAllCartItems,
    getCartItemById,
    createCartItem,
    updateCartItem,
    deleteCartItem
};