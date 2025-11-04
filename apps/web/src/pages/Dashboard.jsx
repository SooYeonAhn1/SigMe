// apps/web/src/pages/Dashboard.jsx

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { useAuth } from "../hooks/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData, isLoading, logout } = useAuth();
  // creat authcontext in src/auths/AuthContext.jsx to manage both google and local auth states
  // create a global auth hook to use the authcontext
  // use it to keep track of auth state in the dashboard page

  const handleLogout = async () => {
    console.log("handleLogout called");
    await logout();
    navigate(ROUTES.LANDING);
  };

  return (
    <div>
      <h1>Welcome to your dashboard, {userData?.username || "User"}</h1>
      {console.log("Dashboard component rendered")}
      <button onClick={() => navigate(ROUTES.SETTINGS)}>settings</button>
      <button onClick={() => navigate(ROUTES.CHECKLIST)}>checklist</button>
      <button onClick={handleLogout}>Logout</button>
      {/* <button onClick={() => navigate(ROUTES.HOME)}>home</button> */}
    </div>
  );
}
