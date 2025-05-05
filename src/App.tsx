import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import { theme } from './theme';
import { useDocumentTitle } from './hooks/useDocumentTitle';

/**
 * Root application component
 * Sets up routing configuration for the app
 * Currently supports:
 * - Home page (HomePage)
 * - Product list page (ProductList)
 * - Cart page (placeholder)
 */

const CartPage = () => {
  useDocumentTitle('Cart');
  return <div>Cart Page</div>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default'
        }}>
          <Navbar />
          <Container sx={{
            mt: 4,
            flex: 1,
            px: { xs: 1, sm: 2, md: 3 },
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;