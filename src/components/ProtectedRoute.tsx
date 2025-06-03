
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Login } from "@/components/Login";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return <>{children}</>;
};
