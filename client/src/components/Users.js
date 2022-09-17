import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then(res => {
        return res.data;
      })
      .then(res => {
        setUsers(res);
      });
  });

  console.log('user', users);
  const user = users.map(user => {
    return <li>{user}</li>;
  });
  return (
    <div>
      <h1>USERS</h1>
      <h1>{data}</h1>
      <ul>{user}</ul>
    </div>
  );
};

export default Users;
