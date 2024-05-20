import React, { useState } from 'react';
import useEnterWorld from '../hooks/useEnterWorld';

const EnterWorld = () => {
  const { enterWorld, data, error, loading } = useEnterWorld();

  const handleEnterWorld = () => {
    enterWorld();
  };

  return (
    <div>
      <h2>Enter World</h2>
      <button onClick={handleEnterWorld} disabled={loading}>
        {loading ? 'Entering...' : 'Enter'}
      </button>
      {data && <div>Location: {JSON.stringify(data)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default EnterWorld;
