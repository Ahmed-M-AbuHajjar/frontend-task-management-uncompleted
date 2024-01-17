import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './features/auth/authProvider';

interface AuthRouteProps extends Omit<RouteProps, 'element'> {
    element: React.ReactElement
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <Route {...(rest as RouteProps)} element={element} />
      ) : (
        <Navigate to="/login" />
      );
    };

export default AuthRoute;