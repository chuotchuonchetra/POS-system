export type UserRole = "admin" | "owner" | "cashier";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
}

export const getToken = () => localStorage.getItem("token");

export const getCurrentUser = (): AuthUser | null => {
  const value = localStorage.getItem("user");
  if (!value) return null;

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
};

export const getDefaultPathForRole = (role?: string) => {
  if (role === "admin" || role === "owner") return "/dashboard";
  return "/cashier";
};

export const hasAllowedRole = (allowedRoles: UserRole[], role?: string) => {
  return Boolean(role && allowedRoles.includes(role as UserRole));
};
