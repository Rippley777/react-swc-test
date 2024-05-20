import UpdateLocation from './components/updateLocation';
import GetLocation from './components/getLocation';
import useEnterWorld from './hooks/useEnterWorld';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setupWebRTC } from '../../services/webrtc';

const Game = () => {
  const userLocations = useSelector(
    (state: RootState) => state.webrtc.userLocations,
  );
  const { enterWorld, data, error, loading } = useEnterWorld();

  useEffect(() => {
    setupWebRTC();
  }, []);

  const renderUserLocations = () => {
    return Object.entries(userLocations).map(([userId, location]) => (
      <div key={userId}>
        {userId}: {JSON.stringify(location)}
      </div>
    ));
  };

  const handleEnterWorld = () => {
    enterWorld();
  };

  useEffect(() => {
    handleEnterWorld();
  }, []);

  return (
    <div>
      <h1>Oof check out this game</h1>
      <h2>Look at these freakin grafx</h2>
      <div>{renderUserLocations()}</div>
      <UpdateLocation />
      <GetLocation />
    </div>
  );
};

export default Game;
