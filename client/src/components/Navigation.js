import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Navigation = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState('');
  const cookies = new Cookies();
  const cookie = cookies.get('loggedIn');

  useEffect(() => {
    setLoggedIn(cookie);
  }, [cookie]);

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/logout', {
        withCredentials: true,
      })
      .then(res => navigate('/'));
  };

  return (
    <header className='main-header'>
      <nav className='main-header__nav'>
        <div className='main-header__item-list'>
          <div className='main-header__item-left'>
            <div className='main-header__item'>
              <NavLink to='/' end>
                Shop
              </NavLink>
            </div>
            <div className='main-header__item'>
              <NavLink to='/products'>Products</NavLink>
            </div>
            {loggedIn === 'true' && (
              <div className='main-header__item'>
                <NavLink to='/cart'>Cart</NavLink>
              </div>
            )}
            {loggedIn === 'true' && (
              <div className='main-header__item'>
                <NavLink to='/orders'>Orders</NavLink>
              </div>
            )}
            {loggedIn === 'true' && (
              <div className='main-header__item'>
                <NavLink to='/admin/add-product'>Add Product</NavLink>
              </div>
            )}
            {loggedIn === 'true' && (
              <div className='main-header__item'>
                <NavLink to='/admin/products'>Admin Products</NavLink>
              </div>
            )}
          </div>
          <div className='main-header__item-right'>
            {loggedIn === 'false' ? (
              <div className='main-header__item'>
                <NavLink to='/login'>Login</NavLink>
              </div>
            ) : (
              <div className='main-header__item'>
                <a href='#' onClick={handleLogout}>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
