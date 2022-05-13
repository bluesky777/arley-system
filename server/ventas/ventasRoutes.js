const express = require('express');
const ventasController = require('./ventasController');
const router = express.Router();


router.get('/', ventasController.index);
router.put('/', ventasController.insert); // crear nueva venta
router.put('/edit', ventasController.update);
router.get('/ultimas', ventasController.getUltimasVentas);
router.delete('/desactivar/:id', ventasController.desactivar);
router.get('/factura-individual', ventasController.facturaIndividual);


module.exports = router;