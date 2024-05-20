import { useState } from 'react';
import api from '../api';

const useGetUserLocation = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserLocation = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/locations/get-location`);
      setData(response.data);
    } catch (err: any) {
      setError(err.response ? err.response.data : 'Error fetching location');
    } finally {
      setLoading(false);
    }
  };

  return { getUserLocation, data, error, loading };
};

export default useGetUserLocation;
