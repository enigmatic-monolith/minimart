import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { TasksDashboard } from '../pages/TasksDashboard';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['admin', 'resident']}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute allowedRoles={['admin', 'resident']}>
            <TasksDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
