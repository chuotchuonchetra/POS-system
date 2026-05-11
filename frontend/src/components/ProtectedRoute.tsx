import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser, getDefaultPathForRole, getToken, hasAllowedRole, type UserRole } from "../lib/auth";

interface Props {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const location = useLocation();
  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !hasAllowedRole(allowedRoles, user.role)) {
    return <Navigate to={getDefaultPathForRole(user.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;
