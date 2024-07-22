import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const MainLayout = () => {
    console.log("MainLayout rendered"); // 调试信息
  return (
    <div style={{ display: 'flex' }}>
      <Menu />                                  
      <div style={{ flex: 1, padding: '1rem' }}>  
        <Outlet />                               
      </div>
    </div>
  );
};

export default MainLayout;
