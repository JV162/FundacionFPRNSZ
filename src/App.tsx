import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicPage from './pages/PublicPage';
import DonorDashboard from './pages/donor/DonorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import DonationsManagement from './pages/admin/DonationsManagement';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import UsersManagement from './pages/admin/UsersManagement';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<PublicPage />} />
      
      {/* Ruta de registro */}
      <Route path="/register" element={<RegisterForm />} />
      
      {/* Ruta de login */}
      <Route path="/login" element={<LoginForm />} />
      
      {/* Rutas protegidas para donantes */}
      <Route 
        path="/donor" 
        element={
          <ProtectedRoute requiredRole="donor">
            <DonorDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas protegidas para administradores */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Rutas específicas del panel administrativo */}
      <Route 
        path="/admin/donations" 
        element={
          <ProtectedRoute requiredRole="admin">
            <DonationsManagement />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/projects" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ProjectsManagement />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute requiredRole="admin">
            <UsersManagement />
          </ProtectedRoute>
        } 
      />
      {/* Redirección automática basada en el rol del usuario */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {user?.role === 'admin' ? 
              <Navigate to="/admin" replace /> : 
              <Navigate to="/donor" replace />
            }
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;