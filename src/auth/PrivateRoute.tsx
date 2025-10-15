import React, { useState, useEffect } from 'react';
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth';
import Sidebar from '../components/Sidebar';// Sidebar component import edildi

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    isAuthenticated()
      .then(result => {
        setAuthenticated(result);
      })
      .catch(err => {
        console.log("try-catch")
        setAuthenticated(false);
      });
  }, [location]);

  const handleSidebar = () => {
    // authenticated durumuna göre Sidebar'ı gösterme veya gizleme
    if (authenticated) {
      return <Sidebar />;
    }
    return null;
  };

  if (authenticated === null) {
    return null;
  }

  return authenticated && authenticated !== null ? (
    <>
      {handleSidebar()} {/* Sidebar'ı burada çağırma */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
