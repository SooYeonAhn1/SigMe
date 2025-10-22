// apps/web/src/hooks/useGoogleAuth.js

import { useState } from "react";

const AUTH_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useGoogleAuth() {
  const [googleError, setGoogleError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setGoogleError(null);

    try {
      AUTH_API_BASE_URL;
      const response = await fetch(`${AUTH_API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Save JWT token & user info from server
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      setGoogleError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setGoogleError("Google sign-in failed");
  };

  const googleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    googleSignOut,
    googleError,
    loading,
  };
}
