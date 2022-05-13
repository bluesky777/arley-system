export const currencyFormat = (num) => {
  if (isNaN(num)) return '-'
  return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getPrecio = (venta, producto) => {
  let precio = 0
  if (venta) {
    precio = producto[`precio${venta.tipo_precio}`]
  }
  return precio
}

export const getTotalVenta = (productos, venta) => {
  const totalVenta = productos.reduce((acc, prod) => {
    const precio = getPrecio(venta, prod)
    return acc + (prod.value * precio)
  }, 0)
  return totalVenta
}
