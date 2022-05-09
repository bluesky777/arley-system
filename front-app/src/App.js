import 'antd/dist/antd.min.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './app/dasboard/Dashboard'
import Login from './app/login/Login'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
