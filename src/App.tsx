import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store/store';
import './App.css';

import Landing from './pages/landing';
import Login from './pages/login';
import Player from './pages/player';
import Game from './pages/game';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="/player" element={<Player />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
