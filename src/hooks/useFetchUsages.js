import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchUsages = () => {
  const [usages, setUsages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_USAGES

    axios.get(apiUrl)
      .then(response => {
        const { result, stats } = response.data

        // Combina result y stats en un solo array
        const combinedData = stats.map((stat, index) => ({
          key: result[index],
          doc_count: stat.doc_count
        })).filter(item => item.key); // Filtra elementos con key vacíos

        // Limita a 10 elementos (si es necesario)
        const limitedUsages = combinedData.slice(0, 10)

        setUsages(limitedUsages)
        setLoading(false)
      })
      .catch(error => {
        setError('Error fetching usages data')
        setLoading(false)
      })
  }, [])

  return { usages, loading, error }
}

export default useFetchUsages
