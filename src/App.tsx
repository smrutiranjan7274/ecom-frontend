import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import { theme } from './theme';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';

/**
 * Root application component
 * Sets up routing configuration for the app
 * Currently supports:
 * - Home page (HomePage)
 * - Product list page (ProductList)
 * - Cart page (placeholder)
 */

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;