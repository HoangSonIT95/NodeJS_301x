import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then(res => {
        return res.data;
      })
      .then(res => {
        setUsers(res);
      })
      .catch(err => {
        console.log(err);
      });
  });

  if (users.length > 0) {
    const user = users.map((user, id) => {
      return <li key={id}>{user}</li>;
    });
    return (
      <div>
        <h5>USERS</h5>
        <p>{user}</p>
      </div>
    );
  } else {
    return <h1>No User Found!</h1>;
  }
};

export default Users;
