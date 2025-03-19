// src/components/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const userRole = localStorage.getItem('user_role');
  return userRole === 'admin' ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminProtectedRoute;
