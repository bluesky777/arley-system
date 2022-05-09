import { Col, List, Row, InputNumber } from 'antd'
import { currencyFormat, getPrecio } from './utils'

const ProductoListItem = ({ item, index, nuevo, handleChangeItem }) => {
  const handleChangeItemInter = (val) => {
    item.value = val
    handleChangeItem(item)
  }

  item.value = item.value !== undefined ? item.value : 0

  const precio = getPrecio(nuevo, item)

  return (
    <List.Item>
      <Row>
        <Col span={10}>{index + 1}. {item.nombre}</Col>
        <Col span={6}>
          <InputNumber min={0} max={1000} value={item.value} onChange={handleChangeItemInter} />
        </Col>
        <Col span={4}>
          { currencyFormat(precio) }
        </Col>
        <Col span={4}>
          { currencyFormat(item.value * precio) }
        </Col>
      </Row>
    </List.Item>
  )
}

export default ProductoListItem
