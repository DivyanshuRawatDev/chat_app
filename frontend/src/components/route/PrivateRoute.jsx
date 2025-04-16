import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { API } from '../../utils/axios';

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    API.get('/auth/check')
      .then(() => setIsAuth(true))
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  if (!isAuth) return 'Loading...';
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
