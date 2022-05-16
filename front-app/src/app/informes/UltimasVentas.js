import { Row, Col } from 'antd'
import { currencyFormat, getTotalVenta, getCantidadProducto, getTotalTodasVentas } from '../ventas/utils'
import './style.css'

export const UltimasVentas = ({ ventas }) => {
  const { productos } = ventas[0]
  return (
    <>
      <Row>
        <Col span={24}>
          Arley System
        </Col>
        <Col span={24}>
          Cuida tu cuerpo como te mereces.
        </Col>
        <Row gutter={[16, 16]}>
          <Col span={3} className="center-align">Cliente</Col>
          {productos.map((producto, index) => {
            return <Col span={3} key={index} className="center-align">{ producto.nombre }</Col>
          })}
          <Col span={3} className="center-align">Total</Col>
        </Row>
        {
          ventas.map((venta, index) => {
            return (
              <Row gutter={[16, 16]} key={index}>
                <Col span={3}>{index + 1}. {venta.cliente.nombre}</Col>
                {venta.productos.map((producto, ind) => (
                  <Col span={3} key={ind} className="right-align">{producto.value}</Col>
                ))}
                <Col span={3} className="right-align">{currencyFormat(getTotalVenta(venta.productos, venta))}</Col>
              </Row>
            )
          })
        }
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={3} className="right-align">
          Cantidad:
        </Col>
        {Object.values(getCantidadProducto(ventas)).map((prod, ind) => <Col span={3} key={ind} className="right-align">{prod}</Col>)}
        <Col span={3} className="right-align">
          {currencyFormat(getTotalTodasVentas(ventas).valorTotal)}
        </Col>
      </Row>
    </>
  )
}
