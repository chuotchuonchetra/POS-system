import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser, getDefaultPathForRole, getToken } from "../lib/auth";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const user = getCurrentUser();

  if (token && user) {
    return <Navigate to={getDefaultPathForRole(user.role)} replace />;
  }

  return children;
};

export default PublicRoute;
