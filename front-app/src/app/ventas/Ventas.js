import { Row, Col, Table, Alert } from 'antd'
import useFetchVentas from '../api/useFetchVentas'
import VentaNew from './VentaNew'
import { useDefaultData } from './useDefaultData'
import './styles.css'
import { useState } from 'react'
import VentaEdit from './VentaEdit'

export const Ventas = () => {
  const handleClientClick = (cliente, venta) => {
    setVentaActual(venta)
    console.log(cliente, venta)
  }
  const [filteredInfo, setFilteredInfo] = useState(null)
  const {
    productos,
    clientes,
    ventas,
    error,
    loading,
    setVentas
  } = useFetchVentas('ventas')
  const columns = useDefaultData(handleClientClick, filteredInfo)
  const [ventaActual, setVentaActual] = useState(null)

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

  const handleCreated = (venta) => {
    setVentas(ventas => {
      return [
        ...ventas,
        venta
      ]
    })
  }

  const handleChangeTable = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    setFilteredInfo(filters)
  }

  const handleUpdated = (venta) => {
    setVentas(ventas => {
      return ventas.map(el => el._id === venta._id ? venta : el)
    })
    setVentaActual(null)
  }

  const handleCancelar = () => {
    setVentaActual(null)
  }

  return (
    <div>
      { loading && 'Trayendo datos...' }
      { productos?.length > 0 && (
          <Row>
            <Col span={24}>
              {
                !ventaActual &&
                <VentaNew
                  productos={productos}
                  clientes={clientes}
                  venta={ventaActual}
                  handleCreated={handleCreated}
                />
              }
              <Table dataSource={ventas} columns={columns} onChange={handleChangeTable} />
              {
                ventaActual &&
                <VentaEdit
                  productos={productos}
                  clientes={clientes}
                  ventaActual={ventaActual}
                  handleUpdated={handleUpdated}
                  handleCancelar={handleCancelar}
                />
              }
            </Col>
          </Row>
      )}
    </div>
  )
}
