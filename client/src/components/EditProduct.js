import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/edit-product/${params.productId}`)
      .then(res => setProduct(res.data));
  }, [params.productId]);
  if (product) {
    return (
      <main>
        <form className='product-form'>
          <div className='form-control'>
            <label for='title'>Title</label>
            <input type='text' name='title' id='title' value={product.title} />
          </div>
          <div className='form-control'>
            <label for='imageUrl'>Image URL</label>
            <input
              type='text'
              name='imageUrl'
              id='imageUrl'
              value={product.imageUrl}
            />
          </div>
          <div className='form-control'>
            <label for='price'>Price</label>
            <input
              type='number'
              name='price'
              id='price'
              step='0.01'
              value={product.price}
            />
          </div>
          <div className='form-control'>
            <label for='description'>Description</label>
            <textarea
              name='description'
              id='description'
              rows='5'
              value={product.description}
            ></textarea>
          </div>
          <input type='hidden' name='productId' />
          <button className='btn' type='submit'>
            Update Product
          </button>
        </form>
      </main>
    );
  } else {
    return <h1>Xảy ra lỗi. Vui lòng thử lại sau!</h1>;
  }
};

export default EditProduct;
