import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Products from './Products';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/products', {
        withCredentials: true,
      })
      .then(res => {
        const products = res.data;
        setProducts(products);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const onDelete = e => {
    const prodId = e.target.productId.value;
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/admin/delete-product/${prodId}`, {
        withCredentials: true,
      })
      .then(res => {
        setProducts(products.filter(product => product._id !== prodId));
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
          <h2 className='product__price'>{product.price}$</h2>
          <p className='product__description'>{product.description}</p>
        </div>
        <div className='card__actions'>
          {/* <form className='form__btn' onSubmit={this.onEdit}>
              <input type='hidden' name='productId' value={product.id} />
              <button className='btn'>Edit</button>
            </form> */}
          <Link to={'/admin/edit-product/' + product._id} className='btn'>
            Edit
          </Link>
          <form className='form__btn' onSubmit={onDelete}>
            <button className='btn' type='submit'>
              Delete
            </button>
            <input
              type='hidden'
              name='productId'
              id='productId'
              value={product._id}
            />
          </form>
        </div>
      </article>
    );
  });
  return <div className='grid'>{productsList}</div>;
};

export default AdminProducts;
