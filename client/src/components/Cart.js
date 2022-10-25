import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/cart').then(res => {
      setProducts(res.data);
    });
  }, []);

  const onDeleteItem = e => {
    const productId = e.target.productId.value;
    e.preventDefault();
    axios
      .post('http://localhost:3000/cart-delete-item', { productId: productId })
      .then(res => {
        alert('Delete product in cart success!');
        window.location.href = '/cart';
      });
  };

  const postOrder = () => {
    axios.post('http://localhost:3000/create-order').then(res => {
      console.log(res.data);
      window.location.href = '/orders';
    });
  };
  if (products.length > 0) {
    const renderCart = products.map(item => {
      return (
        <div>
          <h3>
            {item.productId.title} ({item.quantity})
          </h3>
          <form onSubmit={onDeleteItem}>
            <input type='hidden' name='productId' value={item.productId._id} />
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
