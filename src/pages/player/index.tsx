import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import Button from '../../components/ui/buttons';
import { useUserLogout } from '../../api/user';
import { fetchPlayerData } from '../../store/reducers/player';
import CharacterSelect from './components/characterSelect';
import world from '../../assets/world-shadow.webp';

const Player: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const player = useSelector((state: RootState) => state.player);
  const { mutate: logout } = useUserLogout();
  const {
    userData: { username },
  } = user;

  useEffect(() => {
    dispatch(fetchPlayerData());
  }, []);

  useEffect(() => {
    if (user.isAuthenticated === false) {
      window.location.href = '/login';
    }
  }, [user]);

  useEffect(() => {
    // console.log(player);
  }, [player]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div
      className="bg-[#01520e]"
      style={{
        backgroundImage: `url(${world})`,
        // backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div className="flex flex-col p-5">
        <div className="flex justify-between">
          <h1>{username}</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <div className="flex">
          <div className="flex-1">
            {player.status === 'loading' && <span>loading</span>}
            {player.status === 'error' && <span>error</span>}
            {player.status === 'idle' && player.default && (
              <div>level {player.default?.level}</div>
            )}
          </div>
          <div>
            <CharacterSelect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
