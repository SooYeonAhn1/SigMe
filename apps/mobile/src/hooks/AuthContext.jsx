// apps/mobile/src/hooks/AuthContext.jsx
// Basically an AuthContext to manage user authentication state across the app

import React, { createContext, useState, useEffect, useContext, use } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'userAccessToken';
const REFRESH_TOKEN_KEY = 'userRefreshToken';
const USER_DATA_KEY = 'userData';

const getSecureItem = async (key) => {
  if (Platform.OS === 'web') {
    return await AsyncStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
};

const saveSecureItem = async (key, value) => {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const deleteSecureItem = async (key) => {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserSession = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getSecureItem(ACCESS_TOKEN_KEY);
      const userDataString = await AsyncStorage.getItem(USER_DATA_KEY);
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if (accessToken && userData) {
        setUser(userData);
      } else {
        console.log(accessToken, " | ", userData);
        console.warn("failed loading user session");
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user session: ", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  const signOut = async () => {
    await deleteSecureItem(ACCESS_TOKEN_KEY);
    await deleteSecureItem(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
    setUser(null);
  };

  useEffect(() => {
    loadUserSession();
  }, []);

  const authContextValue = {
    user,
    isLoading,
    setUser,
    signOut,
    // signIn: implemented in the hook and injected later
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

