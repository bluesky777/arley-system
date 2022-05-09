const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente', {
  nombre: { type: String },
  celular: { type: String },
  direccion: { type: String },
  tipo_precio: { type: Number },
  active: { type: Boolean },
});

module.exports = Cliente