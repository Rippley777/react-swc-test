import { useState } from 'react';
import api from '../api';

type Location =
  | any
  | {
      //   x: number;
      //   y: number;
      //   z: number;
    };

const useUpdateUserLocation = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState(false);

  const updateUserLocation = async (userId: string, location: Location) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/locations/update-location', { userId, location });
      setMessage('Location updated successfully');
    } catch (err: any) {
      setError(err.response ? err.response.data : 'Error updating location');
    } finally {
      setLoading(false);
    }
  };

  return { updateUserLocation, message, error, loading };
};

export default useUpdateUserLocation;
