import { Layout, Menu } from 'antd'
import Sidebar from './Sidebar'
import './styles.css'
import { Routes, Route } from 'react-router-dom'
import { Products } from '../products/Products'
import { Ventas } from '../ventas/Ventas'

const { Header, Content } = Layout

const items1 = [
  {
    key: 1,
    label: 'Venta'
  },
  {
    key: 2,
    label: 'Informes'
  }
]

const Dashboard = () => {
  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} items={items1} />
      </Header>
      <Layout>
        <Sidebar />
        <Layout>
          <Content
            className='site-layout-background'
          >
            <Routes>
              <Route path='productos' element={<Products />} />
              <Route path='ventas' element={<Ventas />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Dashboard
