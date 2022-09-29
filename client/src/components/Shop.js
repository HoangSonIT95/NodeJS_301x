import React, { Component } from 'react';
import axios from 'axios';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/')
      .then(res => {
        console.log(res.data);
        const products = res.data;
        this.setState({ products });
      })
      .catch(err => {
        console.log(err);
      });
  }
  addToCart(e) {
    e.preventDefault();
    let productId = e.target.productId.value;
    axios
      .post('http://localhost:5000/cart', { productId: productId })
      .then(res => {
        alert('Add to cart successfully!');
        window.location.href = 'http://localhost:3000/';
        return res.data;
      })
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
            <a href={`/detail/${product.id}`} className='btn'>
              Details
            </a>
            <form className='form__btn' type='submit' onSubmit={this.addToCart}>
              <button className='btn' type='submit'>
                Add to Cart
              </button>
              <input
                type='hidden'
                name='productId'
                id='productId'
                value={product.id}
              />
            </form>
          </div>
        </article>
      );
    });
    return <div className='grid'>{productsList}</div>;
  }
}

export default Shop;
