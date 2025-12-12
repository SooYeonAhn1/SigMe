// apps/mobile/src/hooks/useDeleteAccount.js

import * as WebBrowser from "expo-web-browser";
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { authGoogleDelete } from "../services/authApi";
// import { Platform } from "react-native";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

WebBrowser.maybeCompleteAuthSession();

export function useDeleteAccount() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout, accessToken, refreshToken } = useAuth();

  const deleteLocalAccount = async (password, authType) => {
    setLoading(true);
    setError(null);

    try {    
      const token = accessToken || refreshToken;

      if (!token) {
        throw new Error("Not authenticated");
      }

      const body = authType === "local" ? { password } : {};

      const response = await fetch(`${API_BASE_URL}/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete account");
      }

      await logout();
      return true;
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteGoogleAccount = async () => {
    try {
      const token = accessToken || refreshToken;
      await authGoogleDelete(accessToken, refreshToken);
      await logout();
    } catch (error) {
      setError(error.message);
      console.error("deleteGoogleAccount:", error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {deleteLocalAccount, deleteGoogleAccount, error, loading };
}