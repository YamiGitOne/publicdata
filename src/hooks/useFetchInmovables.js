import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchInmovables = () => {
  const [inmovables, setInmovables] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = 'https://datos.juntadeandalucia.es/api/v0/inmovables/openapi.json'

    axios.get(apiUrl, { params: { page: 1, per_page: 10 } })
      .then(response => {
        setInmovables(response.data?.inmovables || [])
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching inmovables data')
        setLoading(false)
      })
  }, [])

  return { inmovables, loading, error }
};

export default useFetchInmovables
