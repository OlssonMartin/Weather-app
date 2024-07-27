import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Hitta rot-elementet i din HTML där React-appen ska renderas
const rootElement = document.getElementById('root');

// Skapa en root med hjälp av createRoot
const root = ReactDOM.createRoot(rootElement);

// Rendera din App-komponent
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);