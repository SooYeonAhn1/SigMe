import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import DailyLogs from "./pages/DailyLogs";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Reports from "./pages/Report";
import MedsInfo from "./pages/MedsInfo";
import Checklists from "./pages/Checklist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {console.log("app component rendered")}
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.DAILY_LOGS} element={<DailyLogs />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.REPORT} element={<Reports />} />
        <Route path={ROUTES.CHECKLIST} element={<Checklists />} />
        <Route path={ROUTES.MEDS_INFO} element={<MedsInfo />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
