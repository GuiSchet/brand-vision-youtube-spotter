
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (success: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("brand-vision-auth");
    const savedUser = localStorage.getItem("brand-vision-user");
    
    if (authStatus === "true" && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  }, []);

  const login = (success: boolean) => {
    if (success) {
      const savedUser = localStorage.getItem("brand-vision-user");
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("brand-vision-auth");
    localStorage.removeItem("brand-vision-user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
