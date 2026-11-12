import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Einstiegspunkt: React rendert die App in das <div id="root"> aus index.html
const wurzel = document.getElementById('root');
if (wurzel === null) {
  throw new Error('Element "#root" wurde in index.html nicht gefunden.');
}

createRoot(wurzel).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
