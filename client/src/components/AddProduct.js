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
      imgUrl: target.imageUrl.value,
      description: target.description.value,
      price: target.price.value,
    };
    axios
      .post('http://localhost:5000/admin/add-product', newProduct)
      .then(res => {
        alert('Add success!');
        window.location.href = 'http://localhost:3000/';
        console.log(res.data);
      });
  }

  render() {
    return (
      <main>
        <form class='product-form' onSubmit={this.onAddProduct}>
          <div class='form-control'>
            <label for='title'>Title</label>
            <input type='text' name='title' id='title' />
          </div>
          <div class='form-control'>
            <label for='imageUrl'>Image URL</label>
            <input type='text' name='imageUrl' id='imageUrl' />
          </div>
          <div class='form-control'>
            <label for='price'>Price</label>
            <input type='number' name='price' id='price' step='0.01' />
          </div>
          <div class='form-control'>
            <label for='description'>Description</label>
            <textarea name='description' id='description' rows='5'></textarea>
          </div>
          <input type='hidden' name='productId' />
          <button class='btn' type='submit'>
            Add Product
          </button>
        </form>
      </main>
    );
  }
}

export default AddProduct;
