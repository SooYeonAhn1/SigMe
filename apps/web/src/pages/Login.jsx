import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../constants/routes";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLocalAuth } from "../hooks/useLocalAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleGoogleSuccess,
    handleGoogleError,
    googleError,
    loading: googleLoading,
  } = useGoogleAuth();
  const {
    handleLocalLogin,
    localError,
    loading: localLoading,
  } = useLocalAuth();

  const navigate = useNavigate();

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await handleGoogleSuccess(credentialResponse);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  // Local login
  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLocalLogin(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Local login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Sign In to SigMe</h1>
      <form onSubmit={handleLocalSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button type="submit" disabled={localLoading}>
          {localLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {localError && <p style={{ color: "red" }}>{localError}</p>}

      <br />
      {googleLoading && <p>Loading...</p>}
      {googleError && <p style={{ color: "red" }}>{googleError}</p>}
      {!googleLoading && (
        <GoogleLogin onSuccess={onGoogleSuccess} onError={handleGoogleError} />
      )}
      <button onClick={() => navigate(ROUTES.REGISTER)}>
        Need to register?
      </button>
      <button onClick={() => navigate(ROUTES.LANDING)}>
        Go back to landing page...
      </button>
    </div>
  );
}
