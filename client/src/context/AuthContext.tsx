
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";
import Cookies from 'js-cookie';
interface User {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  refreshAuth: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const userData = await getCurrentUser();
        const userDataFull = userData.user;
        setUser(userDataFull);
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
        Cookies.remove("token");
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const refreshAuth = async () => {
    setLoading(true);
    await checkAuth();
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
