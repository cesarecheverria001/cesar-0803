import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/auth.service';

function ProtectedRoute() {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;