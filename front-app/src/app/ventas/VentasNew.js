import { Card, Col, Row, Select, List, Button, Radio } from 'antd'
import fetch from '../api/fetch'
import ProductoListItem from './ProductoListItem'
import { useState } from 'react'
import { getPrecio, currencyFormat } from './utils'

const { Option } = Select

const VentasNew = ({ productos, clientes }) => {
  const [nuevo, setNuevo] = useState({
    active: true,
    tipo_precio: 1,
    productos
  })

  const handleCrear = () => {
    fetch.put('ventas', nuevo).then((res) => {
      console.log({ res })
    })
  }

  const onChangeCliente = (id) => {
    const item = clientes.find(el => el._id === id)
    setNuevo({
      ...nuevo,
      tipo_precio: item.tipo_precio,
      cliente: item
    })
  }

  const handleChangeItem = (item) => {
    setNuevo({
      ...nuevo,
      productos: productos.map(el => el._id === item._id ? item : el)
    })
  }

  const handleChangePrecio = (e) => {
    setNuevo({ ...nuevo, tipo_precio: e.target.value })
  }

  const footer = () => {
    const total = productos.reduce((acc, prod) => {
      const precio = getPrecio(nuevo, prod)
      return acc + (prod.value * precio)
    }, 0)
    return (
      <Row>
        <Col>Total: {currencyFormat(total)}</Col>
        </Row>
    )
  }

  return (
    <Card title='Nueva venta'>
      <Row>
        <Col span={24}>
          <Select
            showSearch
            placeholder='Seleccione cliente'
            optionFilterProp='children'
            onChange={onChangeCliente}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            {clientes.map((el, ind) => <Option key={el._id} value={el._id}>{`${ind + 1}. ${el.nombre}`}</Option>)}
          </Select>
        </Col>
        <Col span={24} style={{ marginTop: 10 }}>
          <Radio.Group value={nuevo.tipo_precio} onChange={handleChangePrecio} buttonStyle="solid">
            <Radio.Button value={1}>Precio 1</Radio.Button>
            <Radio.Button value={2}>Precio 2</Radio.Button>
            <Radio.Button value={3}>Precio 3</Radio.Button>
            <Radio.Button value={4}>Precio 4</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={24} style={{ marginTop: 10 }}>
          <List
            bordered
            dataSource={productos}
            footer={footer()}
            renderItem={(item, index) => (
              <ProductoListItem item={item} index={index} nuevo={nuevo} handleChangeItem={handleChangeItem} />
            )}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col>
          <Button onClick={handleCrear}>Crear</Button>
        </Col>
      </Row>
    </Card>
  )
}
export default VentasNew
