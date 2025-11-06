// apps/mobile/src/hooks/useDeleteAccount.js

// import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";

import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useDeleteAccount() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  const deleteAccount = async (password, authType) => {
    setLoading(true);
    setError(null);

    try {
      const token = SecureStore.getItem("userAccessToken");

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
  
  return {deleteAccount, error, loading };
}