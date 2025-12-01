import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, token } = useAuthStore();
  const location = useLocation();

  // Verificação de segurança:
  // 1. Estado do Zustand (isAuthenticated)
  // 2. Token na memória do Zustand
  // 3. Token no localStorage (para garantir persistência no F5)
  const isAuth = isAuthenticated || !!token || !!localStorage.getItem('accessToken');

  // Se não houver sinal de login, redireciona
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver autenticado, renderizar o conteúdo
  return <>{children}</>;
};