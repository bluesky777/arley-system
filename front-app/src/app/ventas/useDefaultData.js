export const useDefaultData = (handleClientClick) => {
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
      title: 'Celular',
      dataIndex: 'cliente_celular',
      key: 'cliente_celular'
    },
    {
      title: 'Dirección',
      dataIndex: 'cliente_direccion',
      key: 'cliente_direccion'
    }
  ]
}
