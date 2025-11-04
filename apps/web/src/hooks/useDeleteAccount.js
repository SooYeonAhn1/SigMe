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
      const token = localStorage.getItem("userAccessToken");

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
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, error, loading };
}
