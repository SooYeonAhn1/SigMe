import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>You can manage your settings here</h1>
      {console.log("settings component rendered")}
      <button onClick={() => navigate(ROUTES.DAILY_LOGS)}>Daily logs</button>
      <button onClick={() => navigate(ROUTES.CHECKLIST)}>Checklist</button>
      <button onClick={() => navigate(ROUTES.MEDS_INFO)}>Medicaitons Infomation</button>
      <button onClick={() => navigate(ROUTES.REPORT)}>Report</button>
    </div>
  );
}
