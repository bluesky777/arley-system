import { Row, Col, Table } from 'antd'
import useFetch from '../api/useFetch'
import VentasNew from './VentasNew'
import { columns } from './defaultData'
import './styles.css'

export const Ventas = () => {
  const { data, error, loading } = useFetch('ventas')

  if (error) {
    console.log(error)
  }

  return (
    <div>
      { loading && 'Trayendo datos...' }
      { data && (
          <Row>
            <Col span={24}>
              <VentasNew {...data} />
              <Table dataSource={data.ventas} columns={columns} />
            </Col>
          </Row>
      )}
    </div>
  )
}
