// apps/web/src/hooks/AuthContext.jsx

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  use,
} from "react";

const WebStorage = window.localStorage;

const ACCESS_TOKEN_KEY = "userAccessToken";
const REFRESH_TOKEN_KEY = "userRefreshToken";
const USER_DATA_KEY = "userData";

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
        const accessToken = await WebStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = await WebStorage.getItem(REFRESH_TOKEN_KEY);
        const userDataString = await WebStorage.getItem(USER_DATA_KEY);
        // console.log(userDataString);
        if (accessToken) setAccessToken(accessToken);
        if (refreshToken) setRefreshToken(refreshToken);
        if (userDataString) setUserData(JSON.parse(userDataString));
      } catch (error) {
        console.error("web/hooks/AuthContext userEffect error:", error);
        setUserData(null);
        setAccessToken(null);
        setRefreshToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSession();
  }, []);

  const login = async (accessToken, refreshToken, userData) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserData(userData);

    try {
      WebStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      WebStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      WebStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("web/hooks/AuthContext login error:", error);
    }
  };

  const logout = async () => {
    console.log("Logout function called");
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);

    try {
      WebStorage.removeItem(ACCESS_TOKEN_KEY);
      WebStorage.removeItem(REFRESH_TOKEN_KEY);
      WebStorage.removeItem(USER_DATA_KEY);
    } catch (e) {
      console.error("web/src/hooks/AuthContext logout error:", error);
    }

  };

  const authContextValue = {
    accessToken,
    refreshToken,
    userData,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
