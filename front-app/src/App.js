import 'antd/dist/antd.min.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './app/dasboard/Dashboard'
import Login from './app/login/Login'
import { Products } from './app/products/Products'
import { Ventas } from './app/ventas/Ventas'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Navigate to="/dashboard" /> }/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard />}>
          <Route path='productos' element={<Products />} />
          <Route path='ventas' element={<Ventas />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
