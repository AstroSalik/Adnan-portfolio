import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isUnlocked = sessionStorage.getItem('adnan_auth') === 'true';

  if (!isUnlocked) {
    // Redirect to the login gate if not authenticated
    // We can also use a state to remember where they were trying to go
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
