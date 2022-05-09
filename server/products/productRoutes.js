const express = require('express');
const productController = require('./productController');
const router = express.Router();


router.get('/', productController.index);
router.post('/', productController.insert);


module.exports = router;