const express = require('express');
const ventasController = require('./ventasController');
const router = express.Router();


router.get('/', ventasController.index);
router.put('/', ventasController.insert);


module.exports = router;