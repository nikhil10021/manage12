import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../models/User';
import { Role } from '../models/Role';

interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUser: User = {
  id: 'u1',
  name: 'Alice',
  role: Role.USER,
  borrowedBooks: [],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userId: string) => {
    // For mock, login with Alice or Bob ids only
    if (userId === 'u1') setUser(initialUser);
    else if (userId === 'u2')
      setUser({
        id: 'u2',
        name: 'Bob',
        role: Role.ADMIN,
        borrowedBooks: [],
      });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
