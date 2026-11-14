import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home, { Collections } from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Static, { NotFound } from './pages/Static';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="new" element={<Shop onlyNew />} />
        <Route path="collections" element={<Collections />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        {['about', 'contact', 'delivery', 'terms', 'privacy'].map((k) => (
          <Route key={k} path={k} element={<Static page={k} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
