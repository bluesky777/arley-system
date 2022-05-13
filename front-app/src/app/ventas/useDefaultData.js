import { currencyFormat, getTotalVenta } from './utils'

export const useDefaultData = (handleClientClick, filteredInfo) => {
  return [
    {
      title: 'Creación',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Tipo precio',
      dataIndex: 'tipo_precio',
      key: 'tipo_precio'
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente_nombre',
      key: 'cliente_nombre',
      render: (cliente, venta) => {
        return (
          <a onClick={() => handleClientClick(cliente, venta)} href={() => false}>{cliente}</a>
        )
      }
    },
    {
      title: 'Total',
      dataIndex: 'productos',
      key: 'productos',
      align: 'right',
      render: (productos, venta) => {
        const text = currencyFormat(getTotalVenta(productos, venta))
        const objecyStyle = { background: 'red', color: 'white', fontWeight: 'bold', paddingRight: '2px' }
        const style = venta.pagado ? {} : objecyStyle
        return <div style={style}>{text}</div>
      }
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      filters: [
        { text: 'Pedido', value: 'Pedido' },
        { text: 'Entregado', value: 'Entregado' },
        { text: 'Cancelado', value: 'Cancelado' }
      ],
      filteredValue: filteredInfo ? filteredInfo.estado || null : null,
      onFilter: (value, record) => record.estado.includes(value)
    },
    {
      title: 'Dirección',
      dataIndex: 'cliente_direccion',
      key: 'cliente_direccion'
    }
  ]
}
