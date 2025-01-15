import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProtectedRoute from './ProtectedRoute';
import ResidentDashboard from '../pages/resident/ResidentDashboard';

import { TasksDashboard } from '../pages/tasksDashboard/TasksDashboard';
import { LoginPage } from '../pages/LoginPage';
import { InventoryDashboard } from '../pages/inventoryDashboard/InventoryDashboard';
import { UserManagementPage } from '../pages/userManagement/UserManagement';
import { SetPassword } from '../pages/setPassword/SetPassword';

const getUserRole = (): string => {
  const role = useSelector((state: RootState) => state.auth.role);
  return role || 'guest';
}

const AppRoutes = () => {
  const userRole = getUserRole();
  console.log("User Role: ", userRole);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/set-password" element={<SetPassword />} />

      {/* Protected Routes. Role-Based Redirect for Root */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['admin', 'resident']}>
            {userRole === 'admin' ? (
              <TasksDashboard />
            ) : userRole === 'resident' ? (
              <ResidentDashboard />
            ) : (
              <Navigate to="/login" replace />
            )}
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

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
