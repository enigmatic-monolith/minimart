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
import { CartProvider } from '../pages/resident/CartContext';
import CartPage from '../pages/resident/CartPage';
import ProfilePage from '../pages/resident/ProfilePage';
import { Report } from '../pages/report/Report';
import AuditPage from '../pages/logging/AuditPage';

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
              <CartProvider>
                <ResidentDashboard />
              </CartProvider>
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
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['resident']}>
            <CartProvider>
              <CartPage />
            </CartProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['resident']}>
            <ProfilePage />
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
      <Route 
        path="/audit" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AuditPage /> 
          </ProtectedRoute>
        }    
      />

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
