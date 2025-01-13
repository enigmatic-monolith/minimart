import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProtectedRoute from './ProtectedRoute';
import { TasksDashboard } from '../pages/admin/TasksDashboard';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/resident/HomePage';
import ResidentDashboard from '../pages/resident/ResidentDashboard';

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

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
