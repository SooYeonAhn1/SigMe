import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Report() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Report</h1>
      {console.log("report component rendered")}
      <button onClick={() => navigate(ROUTES.SETTINGS)}>Settings</button>
    </div>
  );
}
