const express = require('express');
const ventasController = require('./ventasController');
const router = express.Router();


router.get('/', ventasController.index);
router.put('/', ventasController.insert); // crear nueva venta
router.put('/edit', ventasController.update);


module.exports = router;