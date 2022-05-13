import { Card, Col, Row, Select, List, Button, Radio, Divider, Modal, message } from 'antd'
import fetch from '../api/fetch'
import ProductoListItem from './ProductoListItem'
import { useState } from 'react'
import { getTotalVenta, currencyFormat } from './utils'
import { SaveFilled } from '@ant-design/icons'

const { Option } = Select

const VentaEdit = ({ productos, clientes, ventaActual, handleUpdated, handleCancelar }) => {
  const getProductos = () => {
    if (ventaActual) {
      const productosEncontrados = productos.map(productoEl => {
        const productoFound = ventaActual.productos.find(productoEdit => productoEdit._id === productoEl._id)
        if (productoFound) {
          return {
            ...productoEl,
            value: productoFound.value
          }
        } else {
          return productoEl
        }
      })
      return productosEncontrados
    } else {
      return productos
    }
  }

  const [nuevo, setNuevo] = useState({
    ...ventaActual,
    active: ventaActual ? ventaActual.active : true,
    tipo_precio: ventaActual ? ventaActual.tipo_precio : 1,
    estado: ventaActual ? ventaActual.estado : 'Pedido',
    pagado: ventaActual ? ventaActual.pagado : 'Pagado',
    productos: getProductos(),
    cliente: ventaActual ? ventaActual.cliente : {}
  })

  const handleCrear = () => {
    if (!nuevo.cliente?.nombre) {
      Modal.error({
        title: 'No hay cliente',
        content: 'Primero debes eligir el cliente'
      })
      return
    }
    update(nuevo)
  }

  const update = (nuevo) => {
    fetch.put('ventas/edit', nuevo).then((res) => {
      message.success('Venta actualizada con exitación')
      handleUpdated(nuevo)
    })
  }

  const onChangeCliente = (id) => {
    const item = clientes.find(el => el._id === id)
    setNuevo({
      ...nuevo,
      tipo_precio: item.tipo_precio,
      cliente: item,
      cliente_nombre: item.nombre,
      cliente_direccion: item.direccion
    })
  }

  const handleChangeItem = (item) => {
    setNuevo({
      ...nuevo,
      productos: nuevo.productos.map(el => el._id === item._id ? item : el)
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

  const handleEliminar = async () => {
    try {
      await fetch.delete('ventas/desactivar/' + nuevo._id, { id: nuevo._id })
      Modal.success({
        title: 'Eliminado correctamente'
      })
    } catch (err) {
      message.error('Error al intentar eliminar venta.')
    }
  }

  const footer = () => {
    const total = getTotalVenta(nuevo.productos, nuevo)
    return (
      <Row>
        <Col>Total: {currencyFormat(total)}</Col>
      </Row>
    )
  }

  return (
    <Card title='Editar venta' hoverable>
      <Row>
        <Col span={24}>
          {ventaActual &&
            <Select
              size='large'
              showSearch
              defaultValue={ventaActual.cliente.nombre}
              placeholder='Seleccione cliente'
              optionFilterProp='children'
              onChange={onChangeCliente}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
            >
              {clientes.map((el, ind) => <Option key={el._id} value={el._id}>{`${ind + 1}. ${el.nombre}`}</Option>)}
            </Select>
          }
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
            dataSource={ventaActual.productos}
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
        <Col span={12} style={{ marginTop: 10 }}>
          <Button onClick={handleEliminar}>Eliminar</Button>
        </Col>
      </Row>
      <Divider />
      <Row style={{ marginTop: 10 }}>
        <Col span={12}>
          <Button shape="round" block onClick={handleCancelar} size={'large'}>
            Cancelar
          </Button>
        </Col>
        <Col span={12}>
          <Button shape="round" block onClick={handleCrear} type="primary" icon={<SaveFilled />} size={'large'}>
            Guardar
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
export default VentaEdit
