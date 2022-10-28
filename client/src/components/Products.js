import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, Navigate, Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const cookies = new Cookies();
  const cookie = cookies.get('loggedIn');
  const [loggedIn, setLoggedIn] = useState(cookie);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then(res => {
        const products = res.data;
        setProducts(products);
      })
      .catch(err => {
        console.log(err);
      });
  }, [cookie]);

  const addToCart = e => {
    e.preventDefault();
    let productId = e.target.productId.value;
    axios
      .post('http://localhost:3000/cart', { productId: productId })
      .then(res => {
        alert('Add to cart successfully!');
        navigate('/cart');
        return res.data;
      })
      .catch(err => console.log(err));
  };

  const productsList = products.map(product => {
    return (
      <article className='card product-item' key={product._id}>
        <header className='card__header'>
          <h1 className='product__title'>{product.title}</h1>
        </header>
        <div className='card__image'>
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div className='card__content'>
          <h2 className='product__price'>{product.price} $</h2>
          <p className='product__description'>{product.description}</p>
        </div>
        <div className='card__actions'>
          <Link to={`/detail/${product._id}`} className='btn'>
            Details
          </Link>
          {loggedIn === 'true' && (
            <form className='form__btn' type='submit' onSubmit={addToCart}>
              <button className='btn' type='submit'>
                Add to Cart
              </button>
              <input
                type='hidden'
                name='productId'
                id='productId'
                value={product._id}
              />
            </form>
          )}
        </div>
      </article>
    );
  });
  return <div className='grid'>{productsList}</div>;
};

export default Products;
