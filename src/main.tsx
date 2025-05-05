import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Development mode warning to check for extension conflicts
 * Only displays in non-production environments
 */
if (process.env.NODE_ENV === 'development') {
  console.warn('Running in dev mode - check for extension conflicts');
}

/**
 * Renders the root React application
 * Uses StrictMode for additional development checks
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);