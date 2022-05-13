import { Row, Col, Button, Card, Spin, Space } from 'antd'
import { useState } from 'react'
import fetch from '../api/fetch'
import { FacturaIndividual } from './FacturaIndividual'
import { UltimasVentas } from './UltimasVentas'

export const Informes = () => {
  const [ventas, setVentas] = useState([])
  const [ventaFactura, setVentaFactura] = useState([])
  const [estadoLoading, setEstadoLoading] = useState('inicial')

  const handleUltimosPedidos = async () => {
    setEstadoLoading('loading')
    const { data } = await fetch.get('/ventas/ultimas')
    setVentas(data.result)
    setEstadoLoading('loaded')
  }
  const handleFacturaIndividual = async () => {
    setEstadoLoading('loading')
    const { data } = await fetch.get('/ventas/factura-individual')
    setVentaFactura(data.result)
    setEstadoLoading('loaded')
  }
  return (
    <div className='hoja-impresion'>
      <Card title='Informes' hoverable className='hidden-print'>
        <Row>
          <Col span={24}>
            <Button onClick={handleUltimosPedidos}>Últimos pedidos</Button>
            <Button onClick={handleFacturaIndividual}>Factura indivual</Button>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          { estadoLoading === 'inicial' && 'Aquí saldrán tus informes' }
          { estadoLoading === 'loading' && <Space size='large'><Spin size="large" /></Space> }

          {ventas.length > 0 && <UltimasVentas ventas={ventas} />}
          {ventaFactura.length > 0 && <FacturaIndividual venta={ventaFactura} />}
        </Col>
      </Row>
    </div>
  )
}
