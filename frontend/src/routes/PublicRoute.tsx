import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectIfAuthenticated = true,
}) => {
  const { isAuthenticated } = useAuthStore();

  // Se estiver autenticado e a rota deve redirecionar, vai para o dashboard
  if (isAuthenticated && redirectIfAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};