import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Detail() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const cookies = new Cookies();
  const loggedIn = cookies.get('loggedIn');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${params.productId}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => console.log(err));
  }, [params.productId]);

  const addToCart = e => {
    e.preventDefault();
    let productId = e.target.productId.value;
    axios
      .post(
        'http://localhost:3000/cart',
        { productId: productId },
        {
          withCredentials: true,
        }
      )
      .then(res => {
        alert('Add to cart successfully!');
        navigate('/cart');
        return res.data;
      })
      .catch(err => console.log(err));
  };

  return (
    <main className='center'>
      <h1>{product.title}</h1>
      <hr />
      <div>
        <img
          src={product.imageUrl}
          alt={product.title}
          width='300px'
          height='350px'
        />
      </div>
      <h2> {product.price} </h2>
      <p> {product.description}</p>
      {loggedIn === 'true' && (
        <form type='submit' onSubmit={addToCart} className='form_add_cart'>
          <button class='btn' type='submit'>
            Add to Cart
          </button>
          <input
            type='hidden'
            name='productId'
            id='productId'
            value={product.id}
          />
        </form>
      )}
    </main>
  );
}

export default Detail;
