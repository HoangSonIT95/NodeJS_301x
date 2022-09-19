import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/cart').then(res => {
      setCart(res.data);
    });
  }, []);
  if (cart.length > 0) {
    const renderCart = cart.map(item => {
      return (
        <h3>
          {item.productData.title} ({item.qty})
        </h3>
      );
    });
    return <div>{renderCart}</div>;
  } else
    return (
      <div>
        <h2>No Products in Cart!</h2>
      </div>
    );
};

export default Cart;
