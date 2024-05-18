import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store/store';
import './App.css';

import Login from './pages/login';
import Player from './pages/player';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/player" element={<Player />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
