// apps/mobile/src/hooks/AuthContext.jsx

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

const developing = process.env.NODE_ENV === "development";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const loadUserSession = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getSecureItem(ACCESS_TOKEN_KEY);
        const refreshToken = await getSecureItem(REFRESH_TOKEN_KEY);
        const userDataString = await AsyncStorage.getItem(USER_DATA_KEY);
        // const userData = userDataString ? JSON.parse(userDataString) : null;

        if (accessToken) setAccessToken(accessToken);
        if (refreshToken) setRefreshToken(refreshToken);
        if (userDataString) setUserData(JSON.parse(userDataString));
        // if (accessToken && userData) {
        //   setUser(userData);
        // } else {
        //   if (developing) console.log(accessToken, " | ", userData);
        //   console.warn("failed loading user session");
        //   setUser(null);
        // }
      } catch (error) {
        console.error("mobile/hooks/AuthContext userEffect error:", error);
        await setUserData(null);
        await setAccessToken(null);
        await setRefreshToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserSession();
  }, []);

  const login = async (accessToken, refreshToken, userData) => {
    console.log("login called");
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    console.log("user data:", userData);
    setUserData(userData);


    try {
      await saveSecureItem(ACCESS_TOKEN_KEY, accessToken);
      await saveSecureItem(REFRESH_TOKEN_KEY, refreshToken);
      await saveSecureItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("mobile/src/hooks/AuthContext signIn error:", error);
      
    }
  };  

  const logout = async () => {
    console.log("Logout function called");
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);

    try {
      await deleteSecureItem(ACCESS_TOKEN_KEY);
      await deleteSecureItem(REFRESH_TOKEN_KEY);
      await deleteSecureItem(USER_DATA_KEY);
      setUserData(null);
    } catch (error) {
      console.error("mobile/src/hooks/AuthContext logout error:", error);
    }
  };

  const authContextValue = {
    accessToken,
    refreshToken,
    userData,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

