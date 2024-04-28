import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['Usertoken']);
  useEffect(() => {
    const tokenExists = !!cookies.Usertoken;
    setIsAuthenticated(tokenExists);
    if (loading && tokenExists) {
      setLoading(false);
      // window.location.reload(); // Reload the page if authentication state changes from loading to authenticated
    } else {
      setLoading(false);
    }
  }, [cookies]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // Render protected routes if authenticated
};

export default PrivateRoutes;
