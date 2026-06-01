import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.css';
import App from './App.jsx';

if (import.meta.env.PROD) {
  registerSW({
    immediate: true,
    onOfflineReady() {
      console.info('[PWA] Aplikacja gotowa do pracy offline.');
    },
    onRegistered(registration) {
      console.info('[PWA] Service Worker zarejestrowany.', registration?.scope);
    },
    onRegisterError(error) {
      console.error('[PWA] Błąd rejestracji Service Workera:', error);
    },
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
