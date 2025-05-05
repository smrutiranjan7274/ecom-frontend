import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProductList from './components/ProductList';
// import Cart from './components/Cart';  // You'll create this later

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><div>Home Page</div></>} />
        <Route path="/cart" element={<><div>Cart Page</div></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;