
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Login } from "@/components/Login";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, login } = useAuth();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return <>{children}</>;
};
