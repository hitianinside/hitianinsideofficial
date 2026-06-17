import { Navigate } from 'react-router-dom';

const AdminRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;