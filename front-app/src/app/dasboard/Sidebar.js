import { Layout, Menu } from 'antd'
import { AppstoreOutlined, SnippetsOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const { Sider } = Layout

const rootSubmenuKeys = ['sub1', 'sub2']

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Sider>
      <div className='logo-sidebar'></div>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ height: '100%', borderRight: 0 }}
        selectedKeys={[window.location.pathname]}
      >
        <Menu.Item key='inicio'>
          <AppstoreOutlined />
          <span>Inicio</span>
          <NavLink to='inicio' />
        </Menu.Item>
        <Menu.Item key='ventas'>
          <AppstoreOutlined />
          <span>Ventas</span>
          <NavLink to='ventas' />
        </Menu.Item>
        <Menu.Item key='productos'>
          <AppstoreOutlined />
          <span>Productos</span>
          <NavLink to='productos' />
        </Menu.Item>
        <Menu.Item key='informes'>
          <SnippetsOutlined />
          <span>Informes</span>
          <NavLink to='informes' />
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
