import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onAddProduct = this.onAddProduct.bind(this);
  }

  onAddProduct(event) {
    event.preventDefault();
    const target = event.target;
    const newProduct = {
      title: target.title.value,
      imageUrl: target.imageUrl.value,
      description: target.description.value,
      price: target.price.value,
    };
    axios
      .post('http://localhost:3000/admin/add-product', newProduct, {
        withCredentials: true,
      })
      .then(res => {
        alert('Add success!');
        window.location.href = '/admin/products';
      });
  }

  render() {
    return (
      <main>
        <form className='product-form' onSubmit={this.onAddProduct}>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' id='title' />
          </div>
          <div className='form-control'>
            <label htmlFor='imageUrl'>Image URL</label>
            <input type='text' name='imageUrl' id='imageUrl' />
          </div>
          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input type='number' name='price' id='price' step='0.01' />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea name='description' id='description' rows='5'></textarea>
          </div>
          <input type='hidden' name='productId' />
          <button className='btn' type='submit'>
            Add Product
          </button>
        </form>
      </main>
    );
  }
}

export default AddProduct;
