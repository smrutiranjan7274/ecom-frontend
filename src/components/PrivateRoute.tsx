import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import type { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;