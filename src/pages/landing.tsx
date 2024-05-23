import { useState } from 'react';
import splashScreen from '../assets/splash-sc.webp';
import LoginForm from '../components/widgets/login/login';

// type LandingProps = {};

const Landing = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [triggerLogin, setTriggerLogin] = useState(false);

  const handleLogin = () => {
    if (showLogin) {
      setTriggerLogin(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${splashScreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
      }}
      className="absolute flex justify-center"
    >
      <div className="relative top-[60%] flex flex-col gap-y-4 items-center mr-5">
        {showSignUp ? (
          <div>Sign Up</div>
        ) : (
          <>
            <div className="h-10">
              {showLogin && <LoginForm triggerLogin={triggerLogin} />}
            </div>
            <button
              className="opacity-90 w-40 p-3 text-3xl text-black bg-[#84f401] border-black border-2 rounded-lg outline-none outline-offset-0 focus:outline-none"
              onClick={handleLogin}
            >
              Login
            </button>
            <button onClick={() => setShowSignUp(true)}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
