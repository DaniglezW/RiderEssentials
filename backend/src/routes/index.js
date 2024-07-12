const express = require('express');
const router = express.Router();

// Importar rutas específicas
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const tagRoutes = require('./tagRoutes');
const cartRoutes = require('./cartRoutes');
const cartItemRoutes = require('./cartItemRoutes');

// Montar rutas en el enrutador principal
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/carts', cartRoutes);
router.use('/cart-items', cartItemRoutes);

module.exports = router;