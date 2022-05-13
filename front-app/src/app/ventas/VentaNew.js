import { Card, Col, Row, Select, List, Button, Radio, Divider, Modal, message } from 'antd'
import fetch from '../api/fetch'
import ProductoListItem from './ProductoListItem'
import { useState } from 'react'
import { getTotalVenta, currencyFormat } from './utils'
import { SaveFilled } from '@ant-design/icons'

const { Option } = Select

const VentaNew = ({ productos, clientes, venta, handleCreated }) => {
  const getProductos = () => {
    if (venta) {
      return productos.map(productoEl => {
        const productoFound = venta.productos.find(productoEdit => productoEdit._id === productoEl._id)
        if (productoFound) {
          return {
            ...productoEl,
            value: productoFound.value
          }
        } else {
          return productoEl
        }
      })
    } else {
      return productos
    }
  }

  const [nuevo, setNuevo] = useState({
    active: true,
    tipo_precio: venta ? venta.tipo_precio : 1,
    estado: 'Pedido',
    pagado: false,
    productos: getProductos()
  })

  const handleCrear = () => {
    if (!nuevo.cliente?.nombre) {
      Modal.error({
        title: 'No hay cliente',
        content: 'Primero debes eligir el cliente'
      })
      return
    }
    crear(nuevo)
  }

  const crear = (nuevo) => {
    fetch.put('ventas', nuevo).then((res) => {
      message.success('Venta creada con exitación')
      handleCreated(res.data.venta)
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
  const handleChangeEstado = (e) => {
    setNuevo({ ...nuevo, estado: e.target.value })
  }
  const handleChangePagado = (e) => {
    setNuevo({ ...nuevo, pagado: e.target.value })
  }

  const footer = () => {
    const total = getTotalVenta(productos, nuevo)
    return (
      <Row>
        <Col>Total: {currencyFormat(total)}</Col>
      </Row>
    )
  }

  return (
    <Card title='Nueva venta' className={'hidden-print'}>
      <Row>
        <Col span={24}>
          <Select
            size='large'
            showSearch
            placeholder='Seleccione cliente'
            optionFilterProp='children'
            onChange={onChangeCliente}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            {clientes.map((el, ind) => <Option key={el._id} value={el._id}>{`${ind + 1}. ${el.nombre}`}</Option>)}
          </Select>
        </Col>
        <Col span={24} style={{ marginTop: 10, textAlign: 'center' }}>
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
        <Col span={12} style={{ marginTop: 10, textAlign: 'center' }}>
          <Radio.Group value={nuevo.estado} onChange={handleChangeEstado} buttonStyle="solid">
            <Radio.Button value="Pedido">Pedido</Radio.Button>
            <Radio.Button value="Entregado">Entregado</Radio.Button>
            <Radio.Button danger value="Cancelado">Cancelado</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={12} style={{ marginTop: 10, textAlign: 'center' }}>
          <Radio.Group value={nuevo.pagado} onChange={handleChangePagado} buttonStyle="solid">
            <Radio.Button value={false}>Sin pagar</Radio.Button>
            <Radio.Button value={true}>Pagado</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Divider />
      <Row style={{ marginTop: 10 }}>
        <Col span={24}>
          <Button shape="round" block onClick={handleCrear} type="primary" icon={<SaveFilled />} size={'large'}>
            Crear
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
export default VentaNew
