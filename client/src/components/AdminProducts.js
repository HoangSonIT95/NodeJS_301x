import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/admin/products', {
        withCredentials: true,
      })
      .then(res => {
        const products = res.data;
        this.setState({ products });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDelete(e) {
    const prodId = e.target.productId.value;
    e.preventDefault();
    axios
      .post(
        'http://localhost:3000/admin/delete-product',
        { prodId },
        {
          withCredentials: true,
        }
      )
      .then(res => (window.location.href = '/admin/products'))
      .catch(err => console.log(err));
  }

  render() {
    const productsList = this.state.products.map(product => {
      return (
        <article className='card product-item'>
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
            <form className='form__btn' onSubmit={this.onDelete}>
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
  }
}

export default AdminProducts;
