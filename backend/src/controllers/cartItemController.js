const cartItemService = require('../services/cartItemService');

const getAllCartItems = async (req, res, next) => {
    try {
        const cartItems = await cartItemService.getAllCartItems();
        res.json(cartItems);
    } catch (error) {
        next(error);
    }
};

const getCartItemById = async (req, res, next) => {
    try {
        const cartItem = await cartItemService.getCartItemById(req.params.id);
        if (!cartItem) {
            res.status(404).json({ message: 'Cart item not found' });
        } else {
            res.json(cartItem);
        }
    } catch (error) {
        next(error);
    }
};

const createCartItem = async (req, res, next) => {
    try {
        const cartItem = await cartItemService.createCartItem(req.body);
        res.status(201).json(cartItem);
    } catch (error) {
        next(error);
    }
};

const updateCartItem = async (req, res, next) => {
    try {
        const cartItem = await cartItemService.updateCartItem(req.params.id, req.body);
        res.json(cartItem);
    } catch (error) {
        next(error);
    }
};

const deleteCartItem = async (req, res, next) => {
    try {
        await cartItemService.deleteCartItem(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCartItems,
    getCartItemById,
    createCartItem,
    updateCartItem,
    deleteCartItem
};