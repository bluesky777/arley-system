import { Row, Col, Select } from 'antd'
import { useEffect, useState } from 'react'
import { FacturaIndividual } from './FacturaIndividual'
import './style.css'

const { Option } = Select

export const SelectVentasFactura = ({ ventas }) => {
  const [selected, setSelected] = useState([])
  const onChangeVenta = (e) => {
    console.log({ e })
    // setSelected()
  }
  useEffect(() => {
    if (ventas.length > 0) {
      setSelected(ventas)
    }
  }, [ventas])
  return (
    <>
      <Row className='hidden-print'>
        <Col span={24}>
          Elija venta
        </Col>
        <Col span={24}>
          <Select
            size='large'
            showSearch
            placeholder='Seleccione cliente'
            optionFilterProp='children'
            onChange={onChangeVenta}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            {ventas.map((el, ind) => <Option key={el._id} value={el._id}>{`${ind + 1}. ${el.cliente.nombre} - ${el.createdAt}`}</Option>)}
          </Select>
        </Col>
      </Row>
      {
        selected.map((venta, index) => {
          return (
            index < 21 ? <FacturaIndividual key={index} venta={venta} /> : null
          )
        })
      }
    </>
  )
}
