// apps/web/src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/AuthContext";

export default function Landings() {
  const navigate = useNavigate();
  const developing = true;
  return (
    <div>
      <h1>Welcome to SigMe. You landed to our homepage</h1>
      {console.log("landing component rendered")}
      <button onClick={() => navigate(ROUTES.REGISTER)}>
        Click to register
      </button>

      {/* The following buttons are active when developing = true.
		These redirect links are active to check that the individual pages are fully working.
		You can click them to go to the respective pages.
		They are disabled when developing = false.
		They will be removed in the final version.    
	  */}
      <button disabled={!developing} onClick={() => navigate(ROUTES.LOGIN)}>
        Log in
      </button>
      <button
        disabled={!developing}
        onClick={() => navigate(ROUTES.DAILY_LOGS)}
      >
        Daily Logs
      </button>
      <button disabled={!developing} onClick={() => navigate(ROUTES.SETTINGS)}>
        Settings
      </button>
      <button disabled={!developing} onClick={() => navigate(ROUTES.REPORT)}>
        Report
      </button>
      <button disabled={!developing} onClick={() => navigate(ROUTES.MEDS_INFO)}>
        Medication Information
      </button>
      <button disabled={!developing} onClick={() => navigate(ROUTES.CHECKLIST)}>
        Checklist
      </button>
      <button disabled={!developing} onClick={() => navigate(ROUTES.DASHBOARD)}>
        Dashboard
      </button>
    </div>
  );
}
