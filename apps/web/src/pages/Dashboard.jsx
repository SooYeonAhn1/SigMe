import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to your dashboard.</h1>
            {console.log("Dashboard component rendered")}
            <button onClick={() => navigate(ROUTES.SETTINGS)}>settings</button>
        </div>
    );
}