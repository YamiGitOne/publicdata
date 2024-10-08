import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchInmovables = () => {
  const [inmovables, setInmovables] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_INMOVABLES;

    axios.get(apiUrl)
      .then(response => {
        const { result, stats } = response.data

        const combinedData = stats.map((stat, index) => ({
          key: result[index],
          doc_count: stat.doc_count
        })).filter(item => item.key) // Filtrar elementos con key vacíos

        const limitedInmovables = combinedData.slice(0, 10)

        setInmovables(limitedInmovables);
        setLoading(false)
      })
      .catch(error => {
        setError('Error fetching inmovables data')
        setLoading(false)
      })
  }, [])

  return { inmovables, loading, error }
}

export default useFetchInmovables
