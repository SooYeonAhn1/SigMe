import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { ROUTES } from "../constants/routes";

export default function LoginPage() {
  const { handleGoogleSuccess, handleGoogleError, googleError, loading } =
    useGoogleAuth();
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse) => {
    try {
      await handleGoogleSuccess(credentialResponse);
      navigate(ROUTES.SETTINGS);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div>
      <h1>Sign In to SigMe</h1>
      {loading && <p>Loading...</p>}
      {googleError && <p>{googleError}</p>}
      {!loading && (
        <GoogleLogin onSuccess={onSuccess} onError={handleGoogleError} />
      )}
    </div>
  );
}
