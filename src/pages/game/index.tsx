import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Scene from './components/Scene';
import useEnterWorld from './hooks/useEnterWorld';
import { RootState } from '../../store/store';
import { setupWebRTC } from '../../services/webrtc';
import useGetUserLocation from './hooks/useGetUserLocation';

const Game: React.FC = () => {
  const userLocations = useSelector(
    (state: RootState) => state.webrtc.userLocations,
  );
  const { enterWorld, data, error, loading } = useEnterWorld();
  const [initiated, setInitiated] = useState(false);
  const {
    getUserLocation,
    data: userLocation,
    error: userLocationError,
    loading: userLocationLoading,
  } = useGetUserLocation();

  useEffect(() => {
    setInitiated(true);
    if (!initiated) {
      setupWebRTC();
      handleEnterWorld();
    }
  }, []);

  const handleEnterWorld = () => {
    enterWorld();
    getUserLocation('1');
  };

  useEffect(() => {}, []);
  if (loading || userLocationLoading) return <div>Loading...</div>;
  return <Scene userStartingLocation={userLocation} />;
};

export default Game;
