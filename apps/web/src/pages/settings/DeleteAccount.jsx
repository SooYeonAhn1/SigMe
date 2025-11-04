import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useAuth } from "../../hooks/AuthContext";
import { ROUTES } from "../../constants/routes";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("local");
  const [showPassword, setShowPassword] = useState(false);
  const { deleteAccount, error, loading } = useDeleteAccount();
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User data:", userData);
    if (userData?.authType) {
      setAuthType(userData.authType);
    }
  }, [userData]);

  const handleDelete = async () => {
    try {
      await deleteAccount(password, authType);
      alert("Account deleted successfully");
      navigate(ROUTES.LANDING);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h1>Delete Account</h1>
      {console.log("deleteAccount component rendered")}
      <ul>
        <li>All your data will be permanently deleted</li>
        <li>This action cannot be undone</li>
      </ul>
      {authType === "local" ? (
        <>
          <p>Enter your password to confirm</p>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </>
      ) : (
        <p>You are signed in with Google. Click delete to proceed.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <button
        onClick={handleDelete}
        disabled={loading || (authType === "local" && !password)}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
      <br />
      <button onClick={() => navigate(ROUTES.SETTINGS)}>Back</button>
    </div>
  );
}
