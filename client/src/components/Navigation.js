import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    return (
      <header class='main-header'>
        <nav class='main-header__nav'>
          <ul class='main-header__item-list'>
            <li class='main-header__item'>
              <a href='/'>Shop</a>
            </li>
            <li class='main-header__item'>
              <a href='/products'>Products</a>
            </li>
            <li class='main-header__item'>
              <a href='/cart'>Cart</a>
            </li>
            <li class='main-header__item'>
              <a href='/orders'>Orders</a>
            </li>
            <li class='main-header__item'>
              <a href='/add-product'>Add Product</a>
            </li>
            <li class='main-header__item'>
              <a href='/admin/products'>Admin Products</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navigation;
