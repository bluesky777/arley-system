const mongoose = require('mongoose');
const Cliente = require('./Cliente');
const Producto = require('./Product');

const Venta = mongoose.model('Venta', new mongoose.Schema({
  datetime: { type: Date },
  tipo_precio: { type: Number },
  cliente: { type: Object },
  productos: { type: [Object] },
  active: { type: Boolean },
}, { timestamps: true }));

module.exports = Venta