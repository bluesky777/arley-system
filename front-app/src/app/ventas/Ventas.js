import { Row, Col, Table, Alert } from 'antd'
import useFetch from '../api/useFetch'
import VentasNew from './VentasNew'
import { useDefaultData } from './useDefaultData'
import './styles.css'

export const Ventas = () => {
  const {
    productos,
    clientes,
    ventas,
    error,
    loading,
    setVentas
  } = useFetch('ventas')
  const columns = useDefaultData((cliente, venta) => {
    console.log(cliente, venta)
  })

  if (error) {
    console.log(error)
    return (
      <Alert
        message="Error"
        description="No se pudo traer los datos."
        type="error"
        showIcon
      />
    )
  }

  const handleCreatedUpdated = (newVenta) => {
    setVentas(ventas => {
      return [
        ...ventas,
        newVenta
      ]
    })
  }

  return (
    <div>
      { loading && 'Trayendo datos...' }
      { productos?.length > 0 && (
          <Row>
            <Col span={24}>
              <VentasNew productos={productos} clientes={clientes} handleCreatedUpdated={handleCreatedUpdated} />
              <Table dataSource={ventas} columns={columns} />
            </Col>
          </Row>
      )}
    </div>
  )
}
