import axios from 'axios';

const AddProduct = () => {
  const onAddProduct = event => {
    event.preventDefault();
    const target = event.target;

    const newProduct = {
      title: target.title.value,
      image: target.image.files[0],
      description: target.description.value,
      price: target.price.value,
    };

    axios
      .post('http://localhost:3000/admin/add-product', newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        withCredentials: true,
      })
      .then(res => {
        alert('Add success!');
        window.location.href = '/admin/products';
      })
      .catch(err => alert(err.response.data));
  };

  return (
    <main>
      <form
        className='product-form'
        onSubmit={onAddProduct}
        encType='multipart/form-data'
      >
        <div className='form-control'>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' />
        </div>
        <div className='form-control'>
          <label htmlFor='image'>Image</label>
          <input type='file' name='image' id='image' />
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
};

export default AddProduct;
