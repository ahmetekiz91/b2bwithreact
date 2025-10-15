import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  // Clear access token from local storage
  localStorage.removeItem('access_token');

  // Redirect to the login page
  return <Navigate to="/login" />;
};

export default Logout;