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

export const getCantidadProducto = (ventas) => {
  const productosCount = {}
  ventas.forEach((venta) => {
    venta.productos.forEach((prod) => {
      if (productosCount[prod.nombre] === undefined) {
        productosCount[prod.nombre] = prod.value
      } else {
        productosCount[prod.nombre] = productosCount[prod.nombre] + prod.value
      }
    })
  })
  return productosCount
}

export const getTotalTodasVentas = (ventas) => {
  const productosCount = {}
  ventas.forEach((venta) => {
    venta.productos.forEach((prod) => {
      let precio = 'precio1'
      if (venta.tipo_precio === 2) precio = 'precio2'
      if (venta.tipo_precio === 3) precio = 'precio3'
      if (venta.tipo_precio === 4) precio = 'precio4'

      if (productosCount[prod.nombre] === undefined) {
        productosCount[prod.nombre] = prod.value * prod[precio]
      } else {
        productosCount[prod.nombre] = productosCount[prod.nombre] + prod.value * prod[precio]
      }
    })
  })
  const valorTotal = Object.values(productosCount).reduce((acc, el) => acc + el, 0)
  console.log(productosCount)
  return { productosCount, valorTotal }
}
