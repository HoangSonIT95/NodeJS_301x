import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [errorInput, setErrorInput] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/edit-product/${params.productId}`)
      .then(res => setProduct(res.data));
  }, [params.productId]);

  const onEditProduct = e => {
    e.preventDefault();
    const target = e.target;
    const updateProduct = {
      title: target.title.value,
      imageUrl: target.imageUrl.value,
      price: target.price.value,
      description: target.description.value,
    };
    axios
      .post(
        `http://localhost:3000/admin/edit-product/${params.productId}`,
        updateProduct,
        {
          withCredentials: true,
        }
      )
      .then(res => {
        alert('Updated Product Success!');
        navigate('/admin/products');
      })
      .catch(err => {
        alert(err.response.data.msg);
        setErrorInput(err.response.data.param);
      });
  };

  if (product) {
    return (
      <main>
        <form className='product-form' onSubmit={onEditProduct}>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              defaultValue={product.title}
              className={errorInput == 'title' ? 'invalid' : ''}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='imageUrl'>Image URL</label>
            <input
              type='text'
              name='imageUrl'
              id='imageUrl'
              defaultValue={product.imageUrl}
              className={errorInput == 'imageUrl' ? 'invalid' : ''}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              name='price'
              id='price'
              step='0.01'
              defaultValue={product.price}
              className={errorInput == 'price' ? 'invalid' : ''}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              rows='5'
              defaultValue={product.description}
              className={errorInput == 'description' ? 'invalid' : ''}
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
