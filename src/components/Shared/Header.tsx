import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header>
      <h1>Library Management System</h1>
      <p>{user ? `Welcome, ${user.name} (${user.role})` : 'Please login'}</p>
    </header>
  );
};

export default Header;
