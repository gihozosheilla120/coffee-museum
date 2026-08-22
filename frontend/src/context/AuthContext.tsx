import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export type AuthUser = { name: string; email: string; avatarUrl: string | null; language: string; role: string };
type Session = { token: string; user: AuthUser };

type ProfileUpdate = { name?: string; email?: string; language?: string };

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (fields: ProfileUpdate) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'coffee-museum-auth';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
export const ASSET_BASE_URL = API_URL.replace(/\/api\/v1\/?$/, '');

export function resolveAssetUrl(url: string | null | undefined) {
  if (!url) return null;
  return url.startsWith('http') ? url : `${ASSET_BASE_URL}${url}`;
}

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function applyAuthHeader(token: string | null) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => {
    const initial = loadSession();
    applyAuthHeader(initial?.token ?? null);
    return initial;
  });

  const persist = (next: Session | null) => {
    setSession(next);
    applyAuthHeader(next?.token ?? null);
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateUser = (user: AuthUser) => {
    setSession(prev => {
      const next = prev ? { ...prev, user } : prev;
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Re-validate the stored token against the database on load, in case the
  // account was removed or the token expired since the last visit.
  useEffect(() => {
    if (!session?.token) return;
    axios
      .get(`${API_URL}/auth/me`)
      .then(res => updateUser(res.data.user))
      .catch(() => persist(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    persist({ token: res.data.token, user: res.data.user });
  };

  const signUp = async (name: string, email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    persist({ token: res.data.token, user: res.data.user });
  };

  const signOut = () => persist(null);

  const updateProfile = async (fields: ProfileUpdate) => {
    const res = await axios.patch(`${API_URL}/auth/me`, fields);
    updateUser(res.data.user);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await axios.patch(`${API_URL}/auth/me/password`, { currentPassword, newPassword });
  };

  const uploadAvatar = async (file: File) => {
    const form = new FormData();
    form.append('avatar', file);
    const res = await axios.post(`${API_URL}/auth/me/avatar`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    updateUser(res.data.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        isAuthenticated: !!session,
        signIn,
        signUp,
        signOut,
        updateProfile,
        changePassword,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
