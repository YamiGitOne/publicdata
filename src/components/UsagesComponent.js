'use client'
import useFetchUsages from '../hooks/useFetchUsages'

const UsagesComponent = () => {
  const { usages, loading, error } = useFetchUsages()

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {usages.length > 0 ? (
          usages.map((usage, index) => (
            <li key={index}>
              {usage.key || 'No title'} - {usage.doc_count || 'No count'}
            </li>
          ))
        ) : (
          <p>No usages available</p>
        )}
      </ul>
    </div>
  )
}

export default UsagesComponent
