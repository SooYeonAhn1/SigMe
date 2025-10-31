// apps/web/src/pages/Dashboard.jsx

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLocalAuth } from '../hooks/useLocalAuth';

export default function Dashboard() {
    const navigate = useNavigate();
    // creat authcontext in src/auths/AuthContext.jsx to manage both google and local auth states
    // create a global auth hook to use the authcontext
    // use it to keep track of auth state in the dashboard page

    return (
        <div>
            <h1>Welcome to your dashboard.</h1>
            {console.log("Dashboard component rendered")}
            <button onClick={() => navigate(ROUTES.SETTINGS)}>settings</button>
            <button onClick={() => navigate(ROUTES.CHECKLIST)}>checklist</button>
            {/* <button onClick={() => navigate(ROUTES.HOME)}>home</button> */}
        </div>
    );
}