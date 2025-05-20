/**
 * Root Application Component
 * Defines the main layout and routing structure of the application
 * Implements responsive container layout and main navigation routes
 */

import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';

/**
 * App Component
 * Sets up the main application structure with:
 * - Navigation bar
 * - Responsive container
 * - Route definitions for all main pages
 */
function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;