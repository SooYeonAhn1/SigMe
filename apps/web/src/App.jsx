import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DailyLogs from './pages/DailyLogs';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Settings from './pages/Settings';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {console.log("app component rendered")}
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/daily-logs" element={<DailyLogs />} />
                <Route path="/settings" element={<Settings />} />
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
        </BrowserRouter>
    );
}