import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Landings() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to SigMe. You landed to our homepage</h1>
      {console.log("landing component rendered")}
      <button onClick={() => navigate(ROUTES.REGISTER)}>
        Click to register
      </button>
    </div>
  );
}
