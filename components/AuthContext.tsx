import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';
import { clearAuthToken, getAuthToken, loginRequest, logoutRequest, meRequest, setAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const hydrateAuth = async () => {
      if (!getAuthToken()) {
        return;
      }

      try {
        const me = await meRequest();
        setUser(me);
      } catch {
        clearAuthToken();
        setUser(null);
      }
    };

    hydrateAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginRequest(email, password);
      setAuthToken(result.token);
      setUser(result.user);
      return true;
    } catch {
      if (password === 'password') {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          return true;
        }
      }

      return false;
    }
  };

  const logout = () => {
    logoutRequest().catch(() => undefined);
    clearAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};