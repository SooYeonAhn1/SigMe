import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Checklist() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Checklist as needed</h1>
      {console.log("checklist component rendered")}
      <button onClick={() => navigate(ROUTES.SETTINGS)}>Settings</button>
    </div>
  );
}
