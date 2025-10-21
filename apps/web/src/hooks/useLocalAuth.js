// apps/web/src/hooks/useLocalAuth.js

import { useState } from "react";

const AUTH_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useLocalAuth() {
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocalSuccess = async (email, password) => {
    const inputData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      })

      if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(errorData.message || "This email is already registered. Redirecting to login page.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed on the server.');
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("successfully received data: ");
      return data;
    } catch (error) {
      setLocalError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLocalError = () => {
    setLocalError("Local registration/sign-in failed");
  };

  const localSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return {
    handleLocalSuccess,
    handleLocalError,
    localSignOut,
    localError,
    loading,
  };
}
