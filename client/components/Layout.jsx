import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* Navbar included here */}
      <Outlet /> {/* The Outlet renders the matched child route component */}
    </div>
  );
};

export default Layout;
