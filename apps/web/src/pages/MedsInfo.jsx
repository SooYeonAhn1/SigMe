import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function MedsInfo() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Medicaitons Info</h1>
      {console.log("meds-info component rendered")}
      <button onClick={() => navigate(ROUTES.SETTINGS)}>Settings</button>
    </div>
  );
}
