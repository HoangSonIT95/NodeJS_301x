import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/cart').then(res => console.log(res));
  });
  return <div></div>;
};

export default Cart;
