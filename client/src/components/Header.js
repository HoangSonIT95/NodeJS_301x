import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <NavLink to='/'>Enter User</NavLink>
      <NavLink to='/users'>Users</NavLink>
    </div>
  );
};

export default Header;
