import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

type AuthUser = { name: string; email: string };

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'coffee-museum-auth';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const persist = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const signIn = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    persist({ name: res.data?.user?.name || email.split('@')[0], email });
  };

  const signUp = async (name: string, email: string, password: string) => {
    await axios.post(`${API_URL}/auth/register`, { name, email, password });
    // The backend register endpoint is a stub and doesn't return a session yet,
    // so the caller sends the visitor to sign in right after this resolves.
  };

  const signOut = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
