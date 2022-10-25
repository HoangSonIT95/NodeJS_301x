import { Routes, Route, Navigate } from 'react-router-dom';
import Shop from './components/Shop';
import Navigation from './components/Navigation';
import AddProduct from './components/AddProduct';
import AdminProducts from './components/AdminProducts';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';
import Detail from './components/ProductDetail';
import Orders from './components/Orders';
import Products from './components/Products';

import './App.css';
import './CSS/main.css';
import './CSS/product.css';
import './CSS/forms.css';
import Login from './components/Login';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const cookie = cookies.get('loggedIn');

  const ProtectedRoute = ({ children }) => {
    if (cookie === 'false') {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/products' element={<Products />} />
        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/add-product'
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/products'
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/edit-product/:productId'
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route exact path='/detail/:productId' element={<Detail />} />
        <Route
          path='/orders'
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
