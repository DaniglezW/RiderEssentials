const cartService = require('../services/cartService');

const getAllCarts = async (req, res, next) => {
    try {
        const carts = await cartService.getAllCarts();
        res.json(carts);
    } catch (error) {
        next(error);
    }
};

const getCartById = async (req, res, next) => {
    try {
        const cart = await cartService.getCartById(req.params.id);
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        } else {
            res.json(cart);
        }
    } catch (error) {
        next(error);
    }
};

const createCart = async (req, res, next) => {
    try {
        const cart = await cartService.createCart(req.body);
        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const cart = await cartService.updateCart(req.params.id, req.body);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        await cartService.deleteCart(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};