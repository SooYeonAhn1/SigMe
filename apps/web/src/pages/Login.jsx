import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { useAuth } from "../hooks/AuthContext";

export default function LoginPage() {
  const { handleGoogleSuccess, handleGoogleError, googleError, loading } =
    useGoogleAuth();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse) => {
    try {
      const response = await handleGoogleSuccess(credentialResponse);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign In to SigMe</h1>
      {/* <form onSubmit={handleSubmit}>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
        <input type="password" id="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
        <button type="submit">Register</button>
      </form> */}
      {loading && <p>Loading...</p>}
      {googleError && <p>{googleError}</p>}
      {!loading && (
        <GoogleLogin onSuccess={onSuccess} onError={handleGoogleError} />
      )}
      <button onClick={() => navigate(ROUTES.REGISTER)}>Need to register?</button>
    </div>
  );
}
