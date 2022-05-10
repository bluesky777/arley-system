const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente', new mongoose.Schema({
  nombre: { type: String },
  celular: { type: String },
  direccion: { type: String },
  tipo_precio: { type: Number },
  active: { type: Boolean },
}, { timestamps: true }));

module.exports = Cliente