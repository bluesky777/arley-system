const dbPromise = require('../db').get();
const Producto = require('../models/Product');
const Cliente = require('../models/Cliente');
const Venta = require('../models/Venta');

exports.index = async function(req, res) {
  try {
    let productos = await Producto.find({ 'active': true });
    let clientes = await Cliente.find({ 'active': true });
    let ventas = await Venta.find({ 'active': true });
    ventas = ventas.map(el => { 
      return {
        ...el._doc, 
        cliente_nombre: el.cliente?.nombre,
        cliente_celular: el.cliente?.celular,
        cliente_direccion: el.cliente?.direccion,
      }
    })
    res.json({ productos, clientes, ventas });
  } catch (error) {
    console.log(error)
    res.status(500).send('Something broke!');
  }
  
}

exports.insert = async function(req, res) {
  const { body } = req
  const ventaRes = new Venta(body);
  ventaRes.save((err, venta) => {
    if (err) return console.error(err);
    console.log('Venta ingresada correctamente.');
    venta = {
        ...venta._doc, 
        cliente_nombre: venta.cliente?.nombre,
        cliente_celular: venta.cliente?.celular,
        cliente_direccion: venta.cliente?.direccion
    }
    res.send({ venta })
  })
}

exports.update = async function(req, res) {
  const { body } = req
  //const userObjectId = mongoose.Types.ObjectId(userIdString);
  const ventaRes = await Venta.updateOne({ _id: body._id }, body);
  //ventaRes.productos = body.productos;

  res.send({ result: ventaRes })
}
