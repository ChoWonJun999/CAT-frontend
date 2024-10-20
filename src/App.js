import { React, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';

import Login from './features/auth/Login';
import Singup from './features/auth/Singup';

import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import History from './pages/History';
import Trade from './pages/Trade';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div className="loadingTag">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />

          <Route
            path=""
            element={
              <MainLayout
                data={[
                  { path: '/', name: '전체 계좌 조회' },
                  { path: '/history', name: '거래 내역' },
                  { path: '/trade', name: 'Auto Trade' },
                ]}
              />
            }
          >
            <Route path="" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/trade" element={<Trade />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
