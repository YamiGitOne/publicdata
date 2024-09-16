'use client'
import useFetchInmovables from '../hooks/useFetchInmovables'

const InmovablesComponent = () => {
  const { inmovables, loading, error } = useFetchInmovables()

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {inmovables.length > 0 ? (
          inmovables.map((inmovable, index) => (
            <li key={index}>
              {inmovable.key || 'No title'} - {inmovable.doc_count || 'No count'}
            </li>
          ))
        ) : (
          <p>No inmovables available</p>
        )}
      </ul>
    </div>
  )
}

export default InmovablesComponent
