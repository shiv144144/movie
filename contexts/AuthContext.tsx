
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (username: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('movietube_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Mock authentication
    const users = JSON.parse(localStorage.getItem('movietube_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === pass);
    
    if (found) {
      const userData = { id: found.id, username: found.username, email: found.email };
      setUser(userData);
      localStorage.setItem('movietube_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (username: string, email: string, pass: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('movietube_users') || '[]');
    if (users.some((u: any) => u.email === email)) return false;

    const newUser = { id: crypto.randomUUID(), username, email, password: pass };
    users.push(newUser);
    localStorage.setItem('movietube_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, username: newUser.username, email: newUser.email };
    setUser(userData);
    localStorage.setItem('movietube_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movietube_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
