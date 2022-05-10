const mongoose = require('mongoose');

const Venta = mongoose.model('Venta', new mongoose.Schema({
  datetime: { type: Date },
  tipo_precio: { type: Number },
  cliente: { type: Object },
  productos: { type: [Object] },
  estado: { type: String },
  pagado: { type: Boolean },
  active: { type: Boolean },
}, { timestamps: true }));

module.exports = Venta