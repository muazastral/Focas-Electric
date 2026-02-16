import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';
import { clearAuthToken, getAuthToken, loginRequest, logoutRequest, meRequest, setAuthToken } from '../services/api';

const USER_STORAGE_KEY = 'focus-electrical-user';

const saveUserToStorage = (user: User) => {
  try { localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)); } catch { /* ignore */ }
};

const loadUserFromStorage = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const clearUserFromStorage = () => {
  try { localStorage.removeItem(USER_STORAGE_KEY); } catch { /* ignore */ }
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(loadUserFromStorage);

  React.useEffect(() => {
    const hydrateAuth = async () => {
      const token = getAuthToken();
      const storedUser = loadUserFromStorage();

      // If we have a real API token, try to verify it
      if (token && token !== 'mock-token') {
        try {
          const me = await meRequest();
          setUser(me);
          saveUserToStorage(me);
          return;
        } catch {
          clearAuthToken();
          clearUserFromStorage();
          setUser(null);
          return;
        }
      }

      // If we have a mock token + stored user, the mock session is still valid
      if (token === 'mock-token' && storedUser) {
        setUser(storedUser);
        return;
      }

      // No token at all — not logged in
      if (!token && !storedUser) {
        return;
      }
    };

    hydrateAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginRequest(email, password);
      setAuthToken(result.token);
      setUser(result.user);
      saveUserToStorage(result.user);
      return true;
    } catch {
      // Mock fallback — works offline when backend is unreachable or credentials differ
      if (password === 'password') {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        if (foundUser) {
          setAuthToken('mock-token');
          setUser(foundUser);
          saveUserToStorage(foundUser);
          return true;
        }
      }

      return false;
    }
  };

  const logout = () => {
    logoutRequest().catch(() => undefined);
    clearAuthToken();
    clearUserFromStorage();
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