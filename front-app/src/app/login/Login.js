import { Layout, Image } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <Layout>
      <Content>
        <Image
          width={200}
          src={'../dashboard/logo_size.jpg'}
        />
        <Link to='/dashboard' />
      </Content>
    </Layout>
  )
}

export default Login
