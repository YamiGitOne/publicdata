'use client'
import useFetchUsers from '../hooks/useFetchUsers'

const ApiComponent = () => {
  const { users, loading, error } = useFetchUsers()

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ApiComponent

