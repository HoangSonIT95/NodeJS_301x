import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/cart').then(res => {
      setCart(res.data);
    });
  }, []);

  const onDeleteItem = e => {
    const productId = e.target.productId.value;
    e.preventDefault();
    axios
      .post('http://localhost:5000/cart-delete-item', { productId: productId })
      .then(res => {
        alert('Delete product in cart success!');
        window.location.href = '/cart';
      });
  };

  const postOrder = () => {
    axios.post('http://localhost:5000/create-order').then(res => {
      console.log(res.data);
      window.location.href = '/orders';
    });
  };
  if (cart.length > 0) {
    const renderCart = cart.map(item => {
      return (
        <div>
          <h3>
            {item.title} ({item.cartItem.quantity})
          </h3>
          <form onSubmit={onDeleteItem}>
            <input type='hidden' name='productId' value={item.id} />
            <button className='btn' type='submit'>
              Delete Item
            </button>
          </form>
        </div>
      );
    });
    return (
      <main className='centered'>
        <div>{renderCart}</div>
        <hr />
        <form type='submit' onSubmit={postOrder}>
          <button type='submit' className='btn'>
            Order Now!
          </button>
        </form>
      </main>
    );
  } else
    return (
      <div>
        <h2>No Products in Cart!</h2>
      </div>
    );
};

export default Cart;
