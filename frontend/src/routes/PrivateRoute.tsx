import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { Loading } from '../components/common';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, getCurrentUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Tentar buscar usuário se tiver token mas não estiver autenticado
    if (!isAuthenticated && !isLoading) {
      getCurrentUser();
    }
  }, [isAuthenticated, isLoading, getCurrentUser]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loading size="lg" text="Carregando..." />
      </div>
    );
  }

  // Se não estiver autenticado, redirecionar para login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver autenticado, renderizar o conteúdo
  return <>{children}</>;
};