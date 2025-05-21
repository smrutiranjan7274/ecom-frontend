import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;