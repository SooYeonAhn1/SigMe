// apps/mobile/src/hooks/useLocalAuth.jsx

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/authApi';
import { AuthContext } from './AuthContext';

export const useLocalAuth = () => {
  const { setUser } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [authSuccess, setAuthSuccess] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("useLocalAuth - registering user: ", email);

      // registerUser calls the server, which returns { user, accessToken, refreshToken }
      const data = await registerUser(email, password);
      
      setUser(data.user);
      return data;
    } catch (e) {
      console.error('useLocalAuth.jsx Registration failed:', e);
      setError(e.message || 'Registration failed.');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Local Login Function (POST /api/login)
  /*
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // loginUser calls the server, which returns { user, accessToken, refreshToken }
      const data = await loginUser(email, password);
      navigation.navigate('Dashboard');
    } catch (e) {
      console.error('Login failed:', e);
      // Assuming the server throws an error for 401 Unauthorized
      setError(e.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };
  */
  return { register /*, login*/, isLoading, error };
};