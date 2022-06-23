import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GameContextProvider } from './context';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
);
