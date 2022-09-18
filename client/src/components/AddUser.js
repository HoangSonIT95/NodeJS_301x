import React from 'react';
import axios from 'axios';

const AddUser = () => {
  const onPost = event => {
    event.preventDefault();
    const newUser = { user: event.target.addUser.value };
    axios.post('http://localhost:5000/', newUser).then(res => {
      alert('Add success!');
      window.location.href = 'http://localhost:3000/users';
      return res.data;
    });
  };

  return (
    <div className='container'>
      <form type='submit' onSubmit={onPost}>
        <input
          className='col-lg-6 col-md-7 col-sm-6'
          placeholder='Add User'
          name='addUser'
        />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
