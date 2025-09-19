import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StatsPage from './Stats';

import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/stats/:shortId' element={<StatsPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
