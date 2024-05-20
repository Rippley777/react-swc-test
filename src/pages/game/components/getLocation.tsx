import { useState } from 'react';
import useGetUserLocation from '../hooks/useGetUserLocation';

const GetLocation = () => {
  const [userId, setUserId] = useState('');
  const { getUserLocation, data, error, loading } = useGetUserLocation();

  const handleGetLocation = () => {
    getUserLocation(userId);
  };

  return (
    <div>
      <h2>Get Location</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Location'}
      </button>
      {data && <div>Location: {JSON.stringify(data)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default GetLocation;
