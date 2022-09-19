import { Routes, Route } from 'react-router-dom';

import Shop from './components/Shop';
import Navigation from './components/Navigation';
import AddProduct from './components/AddProduct';
import AdminProducts from './components/AdminProducts';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';

import './App.css';
import './CSS/main.css';
import './CSS/product.css';
import './CSS/forms.css';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin/add-product' element={<AddProduct />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route
          path='/admin/edit-product/:productId'
          element={<EditProduct />}
        />
      </Routes>
    </div>
  );
}

export default App;
