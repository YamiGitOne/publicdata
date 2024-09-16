'use client'
import React from 'react';
import useFetchInmovables from '../hooks/useFetchInmovables'

const InmovablesComponent = () => {
  const { inmovables, loading, error } = useFetchInmovables();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {inmovables.map((inmovable, index) => (
          <li key={index}>
            {/* Ajusta el contenido mostrado según la estructura de los datos */}
            {inmovable.name || 'No name'} - {inmovable.location || 'No location'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InmovablesComponent;
