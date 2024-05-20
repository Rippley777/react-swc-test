import { useState } from 'react';
import useUpdateUserLocation from '../hooks/useUpdateUserLocation';

const UpdateLocation = () => {
  const [userId, setUserId] = useState('');
  const [location, setLocation] = useState({ x: 0, y: 0, z: 0 });
  const { updateUserLocation, message, error, loading } =
    useUpdateUserLocation();

  const handleUpdateLocation = () => {
    updateUserLocation(userId, location);
  };

  return (
    <div>
      <h2>Update Location</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      <input
        type="number"
        value={location.x}
        onChange={(e) =>
          setLocation({ ...location, x: Number(e.target.value) })
        }
        placeholder="X"
      />
      <input
        type="number"
        value={location.y}
        onChange={(e) =>
          setLocation({ ...location, y: Number(e.target.value) })
        }
        placeholder="Y"
      />
      <input
        type="number"
        value={location.z}
        onChange={(e) =>
          setLocation({ ...location, z: Number(e.target.value) })
        }
        placeholder="Z"
      />
      <button onClick={handleUpdateLocation} disabled={loading}>
        {loading ? 'Updating...' : 'Update Location'}
      </button>
      {message && <div>{message}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default UpdateLocation;
