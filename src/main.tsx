import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Einstiegspunkt: React rendert die App in das <div id="root"> aus index.html
const wurzel = document.getElementById('root');
if (wurzel === null) {
  throw new Error('Element "#root" wurde in index.html nicht gefunden.');
}

// BrowserRouter stellt die URL-basierte Navigation für alle Komponenten bereit
createRoot(wurzel).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
