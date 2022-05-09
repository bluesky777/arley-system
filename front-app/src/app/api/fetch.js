import axios from 'axios'

const { location } = window
export const root = location.hostname === 'localhost' ? 'http://localhost:3001/api' : 'https://arley-system.herokuapp.com/api'

const fetch = axios.create({
  baseURL: root
})

export default fetch
