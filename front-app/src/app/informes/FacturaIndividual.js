import { Row, Col } from 'antd'
import { currencyFormat, getTotalVenta, getCantidadProducto } from '../ventas/utils'
import './style.css'

export const FacturaIndividual = ({ venta }) => {
  const { productos } = venta
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
          <Row gutter={[16, 16]}>
            <Col span={3}>{1}. {venta.cliente.nombre}</Col>
            {venta.productos.map((producto, ind) => (
              <Col span={3} key={ind} className="right-align">{producto.value}</Col>
            ))}
            <Col span={3} className="right-align">{currencyFormat(getTotalVenta(venta.productos, venta))}</Col>
          </Row>

        }
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={3} className="right-align">
          Cantidad:
        </Col>
        {Object.values(getCantidadProducto(venta)).map(prod => <Col span={3} className="right-align">{prod}</Col>)}
        <Col span={3} className="right-align">
          {currencyFormat(getTotalVenta(venta.productos, venta))}
        </Col>
      </Row>
    </>
  )
}
