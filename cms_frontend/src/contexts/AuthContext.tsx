import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../lib/api';

export type Role = 'ADMIN' | 'STAFF' | 'CITIZEN';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (payload: {
    email: string;
    password: string;
    name: string;
    role: Role;
  }) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      const profileRes = await api.get('/auth/me');
      setUser(profileRes.data);

      return { error: null };
    } catch (err: any) {
      return { error: new Error('Invalid email or password') };
    }
  };

  const signUp = async (payload: {
    email: string;
    password: string;
    name: string;
    role: Role;
  }) => {
    try {
      await api.post('/auth/register', payload);
      return { error: null };
    } catch {
      return { error: new Error('Registration failed') };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
