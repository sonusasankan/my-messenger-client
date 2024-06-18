import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../store';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    isAuthenticated ? children : <Navigate to="/login" replace />
  )
};

export default PrivateRoute;