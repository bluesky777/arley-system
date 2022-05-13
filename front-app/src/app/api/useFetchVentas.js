import { useEffect, useState } from 'react'
import fetch from './fetch'

export default function useFetchVentas (url) {
  const [ventas, setVentas] = useState(null)
  const [productos, setProductos] = useState(null)
  const [clientes, setClientes] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async function () {
      try {
        setLoading(true)
        const { data } = await fetch.get(`/${url}`)
        setProductos(data.productos)
        setVentas(data.ventas)
        setClientes(data.clientes)
      } catch (err) {
        setError({ err })
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { productos, ventas, clientes, error, loading, setVentas }
}
