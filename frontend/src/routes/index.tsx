import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout, DashboardLayout } from '../components/layout';

// Pages
import { Login, Register, ForgotPassword } from '../pages/Auth';

// Route Guards
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// Página temporária de Dashboard
const DashboardPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
      <p className="text-gray-400">
        Bem-vindo ao 4Dice! Em breve teremos o dashboard completo aqui.
      </p>
    </div>
  );
};

// Página temporária de Mesas
const TablesPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Minhas Mesas</h1>
      <p className="text-gray-400">Lista de mesas em desenvolvimento...</p>
    </div>
  );
};

// Página temporária de Personagens
const CharactersPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">
        Meus Personagens
      </h1>
      <p className="text-gray-400">
        Lista de personagens em desenvolvimento...
      </p>
    </div>
  );
};

// Página temporária de Compêndio
const CompendiumPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Compêndio</h1>
      <p className="text-gray-400">Compêndio em desenvolvimento...</p>
    </div>
  );
};

// Página temporária de Configurações
const SettingsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Configurações</h1>
      <p className="text-gray-400">Configurações em desenvolvimento...</p>
    </div>
  );
};

// Página 404
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">Página não encontrada</p>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  // Rota raiz - redireciona para dashboard se autenticado, senão para login
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  // Rotas públicas (Auth)
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <PublicRoute redirectIfAuthenticated={false}>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
    ],
  },

  // Rotas privadas (Dashboard)
  {
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/tables',
        element: <TablesPage />,
      },
      {
        path: '/characters',
        element: <CharactersPage />,
      },
      {
        path: '/compendium',
        element: <CompendiumPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);