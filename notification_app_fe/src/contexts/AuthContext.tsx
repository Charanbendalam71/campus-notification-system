'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../services/api';
import { Log } from 'logging_middleware';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        let token = localStorage.getItem('access_token');
        if (token) {
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Registration already completed successfully via backend!
        // Using the credentials generated for this account:
        const clientID = '70181ca9-3ca5-4deb-913e-5263f15374d8';
        const clientSecret = 'JxAWmTWSNtzXRMFz';
        
        Log('frontend', 'info', 'auth', 'Attempting login');


        // Auth
        const authRes = await apiClient.post('/auth', {
          email: 'charansiv53@gmail.com',
          name: 'Charan Bendalam',
          mobileNo: '9014741272',
          githubUsername: 'Charanbendalam71',
          rollNo: 'AP23110011249',
          accessCode: 'QkbpxH',
          clientID,
          clientSecret,
        });

        token = authRes.data.access_token;
        if (token) {
          localStorage.setItem('access_token', token);
          setIsAuthenticated(true);
          Log('frontend', 'info', 'auth', 'Authentication successful');
        }
      } catch (error: any) {
        Log('frontend', 'error', 'auth', `Authentication failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
