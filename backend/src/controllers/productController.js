const productService = require('../services/productService');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getProductsByPriceRange = async (req, res, next) => {
  try {
      const { minPrice, maxPrice } = req.query;

      if (!minPrice || !maxPrice) {
          return res.status(400).json({ message: 'minPrice and maxPrice query parameters are required' });
      }

      const products = await productService.getProductsByPriceRange(parseFloat(minPrice), parseFloat(maxPrice));
      res.json(products);
  } catch (error) {
      next(error);
  }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductsByPriceRange,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};