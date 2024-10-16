import React, { createContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const { data } = await api.post('/auth/google', {
            email: firebaseUser.email,
            name: firebaseUser.displayName,
          });
          localStorage.setItem('token', data.token);
          setUser(firebaseUser);
        } catch (error) {
          console.error('Error during login:', error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
    });
    return unsubscribe;
  }, []);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};