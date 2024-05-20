import { useState } from 'react';
import api from '../api';

const useEnterWorld = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const enterWorld = async () => {
    console.log('Entering world called');

    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/locations/enter-world');
      setData(response.data);
    } catch (err: any) {
      setError(err.response ? err.response.data : 'Error entering world');
    } finally {
      setLoading(false);
    }
  };

  return { enterWorld, data, error, loading };
};

export default useEnterWorld;
