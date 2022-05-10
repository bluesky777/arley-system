import { Layout, Menu } from 'antd'
import { AppstoreOutlined, SnippetsOutlined, GiftOutlined, BankOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const { Sider } = Layout

const rootSubmenuKeys = ['sub1', 'sub2']

const smallScreen = document.body.clientWidth < 576

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const [collapsed, setCollapsed] = useState(smallScreen)

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Sider collapsible collapsed={collapsed} collapsedWidth={60} defaultCollapsed={collapsed} onCollapse={onCollapse}>
      <div className='logo-sidebar'></div>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ height: '100%', borderRight: 0 }}
        selectedKeys={[window.location.pathname]}
      >
        <Menu.Item key='inicio'>
          <BankOutlined />
          <span>Inicio</span>
          <NavLink to='inicio' />
        </Menu.Item>
        <Menu.Item key='ventas'>
          <AppstoreOutlined />
          <span>Ventas</span>
          <NavLink to='ventas' />
        </Menu.Item>
        <Menu.Item key='productos'>
          <GiftOutlined />
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
