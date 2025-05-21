/**
 * Application Entry Point
 * Sets up the React application with necessary providers:
 * - Theme Provider for MUI theming
 * - Router for navigation
 * - CSS baseline reset
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthProvider.tsx'

// Development mode warning
if (process.env.NODE_ENV === 'development') {
  console.warn('Running in dev mode - check for extension conflicts');
}

/**
 * Root render function
 * Wraps the application with required providers in the following order:
 * 1. StrictMode for development checks
 * 2. AuthProvider for authentication context
 * 3. ThemeProvider for MUI theming
 * 4. CSSBaseline for consistent styling
 * 5. BrowserRouter for routing
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter basename='/ecom-frontend'>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);