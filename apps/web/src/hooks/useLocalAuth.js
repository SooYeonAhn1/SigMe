// apps/web/src/hooks/useLocalAuth.js

import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const AUTH_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useLocalAuth() {
  const [localError, setLocalError] = useState(null);
  const [localLoading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLocalSuccess = async (email, password) => {
    const inputData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "This email is already registered. Redirecting to login page."
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Registration failed on the server."
        );
      }

      const data = await response.json();

      await login(data.accessToken, data.refreshToken, data.user);

      console.log("successfully received data: ");
      
      return data;
    } catch (error) {
      setLocalError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLocalLogin = async (email, password) => {
    setLoading(true);
    setLocalError(null);

    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      await login(data.accessToken, data.refreshToken, data.user);

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

  const localSignOut = async () => {
    const { logout } = useContext(AuthContext);
    await logout();
  };

  return {
    handleLocalSuccess,
    handleLocalLogin,
    handleLocalError,
    localSignOut,
    localError,
    loading: localLoading,
  };
}
