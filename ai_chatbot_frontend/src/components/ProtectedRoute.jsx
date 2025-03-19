// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const userRole = localStorage.getItem('user_role');
//   return userRole === 'admin' ? <Outlet /> : <Navigate to="/unauthorized" />;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('session_token');
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
