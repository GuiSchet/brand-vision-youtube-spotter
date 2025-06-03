
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("brand-vision-auth");
        const savedUser = localStorage.getItem("brand-vision-user");
        
        if (authStatus === "true" && savedUser) {
          setIsAuthenticated(true);
          setUser(savedUser);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (success: boolean) => {
    if (success) {
      const savedUser = localStorage.getItem("brand-vision-user");
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("brand-vision-auth");
      localStorage.removeItem("brand-vision-user");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Don't render children until we've checked authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">Cargando...</p>
        </div>
      </div>
    );
  }

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
