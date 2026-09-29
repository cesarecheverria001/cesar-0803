import { Navigate, Outlet } from 'react-router-dom';

import { hasActiveSession } from '../services/storage.service';

function ProtectedRoute() {
  const isAuthenticated = hasActiveSession();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;