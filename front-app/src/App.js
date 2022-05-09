import 'antd/dist/antd.min.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './app/dasboard/Dashboard'
import Login from './app/login/Login'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Navigate to="/dashboard" /> }/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
