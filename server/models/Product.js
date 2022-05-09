const mongoose = require('mongoose');

const Producto = mongoose.model('Producto', {
  nombre: { type: String },
  precio1: { type: Number },
  precio2: { type: Number },
  precio3: { type: Number },
  precio4: { type: Number },
  costo: { type: Number },
  active: { type: Boolean },
});

module.exports = Producto