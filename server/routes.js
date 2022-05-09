const express = require('express');
const productRoutes = require('./products/productRoutes');
const ventasRoutes = require('./ventas/ventasRoutes');
const router = express.Router();

router.use('/products', productRoutes);
router.use('/ventas', ventasRoutes);

module.exports = router;