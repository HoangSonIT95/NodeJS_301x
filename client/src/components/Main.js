import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
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
        const products = res.data;
        this.setState({ products });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const productsList = this.state.products.map(product => {
      return (
        <article class='card product-item'>
          <header class='card__header'>
            <h1 class='product__title'>{product.title}</h1>
          </header>
          <div class='card__image'>
            <img src={product.imageUrl} alt={product.title} />
          </div>
          <div class='card__content'>
            <h2 class='product__price'>{product.price}$</h2>
            <p class='product__description'>{product.description}</p>
          </div>
        </article>
      );
    });
    return <div class='grid'>{productsList}</div>;
  }
}

export default Main;
