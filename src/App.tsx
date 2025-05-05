import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';

/**
 * Root application component
 * Sets up routing configuration for the app
 * Currently supports:
 * - Home page (ProductList)
 * - Cart page (placeholder)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<><div>Cart Page</div></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;