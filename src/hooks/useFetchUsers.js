import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL is not defined')
      setError('API URL is not defined')
      setLoading(false)
      return
    }

    axios.get(`${apiUrl}/users`)
      .then(response => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError('Error fetching data')
        setLoading(false);
      });
  }, []);

  return { users, loading, error }
};

export default useFetchUsers
