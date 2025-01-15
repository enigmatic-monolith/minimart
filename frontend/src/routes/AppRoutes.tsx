import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { TasksDashboard } from '../pages/tasksDashboard/TasksDashboard';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { InventoryDashboard } from '../pages/inventoryDashboard/InventoryDashboard';
import { UserManagementPage } from '../pages/userManagement/UserManagement';
import { SetPassword } from '../pages/setPassword/SetPassword';
import { Report } from '../pages/report/Report';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/set-password" element={<SetPassword />} />

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
      <Route
        path="/inventory"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <InventoryDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Report />
          </ProtectedRoute>
        }
      />

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
