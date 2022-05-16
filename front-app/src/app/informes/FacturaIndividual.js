import { Row, Col, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { currencyFormat, getPrecio, getTotalVenta } from '../ventas/utils'
import './style.css'

const { Title } = Typography

export const FacturaIndividual = ({ venta }) => {
  const [productos, setProductos] = useState([])
  const [fecha, setFecha] = useState(venta.createdAt.split('T')[0])
  useEffect(() => {
    console.log('efectoo')
    if (venta.productos) {
      const productosTemp = venta.productos.filter(el => el.value > 0)
      const faltan = 6 - productosTemp.length
      for (let i = 0; i < faltan; i++) {
        productosTemp.push({})
      }
      setProductos(productosTemp)
    }
  }, [venta])

  const handleFecha = (e) => {
    console.log(e.target.value)
    setFecha(e.target.value)
  }
  return (
    <div className="hoja-factura">
      <Row className='hoja-factura__header'>
        <Col span={18}>
          <Title level={1}>Arley System</Title>
          <Title italic level={3}>Cuida tu cuerpo como te mereces.</Title>
        </Col>
        <Col span={6} className="right-align">
          <Title level={1}>Factura</Title>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          Cliente: {venta.cliente.nombre}
        </Col>
        <Col span={6}>
          Celular: {venta.cliente.celular}
        </Col>
        <Col span={8}>
          Dirección: {venta.cliente.direccion}
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          Fecha: <span className='show-print'>{fecha}</span>
          <input type="date" value={fecha} onChange={handleFecha} className='hidden-print' />
        </Col>
        <Col span={6} className="hidden-print">
          {venta.pagado ? 'Pagada' : 'Sin pagar'}
        </Col>
        <Col span={8} className="hidden-print">
          {venta.estado}
        </Col>
      </Row>
      <Row>
        <table>
          <thead>
            <tr>
              <th>Nro</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productos &&
              productos.map((producto, index) => {
                const precio = getPrecio(venta, producto)
                return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{producto.nombre}</td>
                  <td className='right-align'>{producto.value}</td>
                  <td className='right-align'>{currencyFormat(precio)}</td>
                  <td className='right-align'>{currencyFormat(precio * producto.value)}</td>
                </tr>
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td colSpan="3" className='right-align'>Total:</td>
              <td className='right-align bold '>{currencyFormat(getTotalVenta(venta.productos, venta))}</td>
            </tr>
          </tfoot>
        </table>
      </Row>
      <Row>
        <Col className="hoja-factura__firma-img" span={9}></Col>
      </Row>
      <Row>
        <Col className="hoja-factura__firma-text" span={9}>Anderson Vélez</Col>
      </Row>
    </div>
  )
}
