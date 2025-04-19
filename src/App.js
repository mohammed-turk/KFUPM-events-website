import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import AdminClubPage from "./pages/admin/AdminClubPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MembersList from "./pages/org/MembersList";
import LoginPage from "./pages/shared/LoginPage";



function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Navigate to="/login" />} />  //added new path before login to solve an error
                <Route path="/login" element={<LoginPage />} />
                <Route path="/adminClubs" element={<AdminClubPage />} />
                <Route path="/members" element={<MembersList />} />
                <Route path="/adminProf" element={<AdminProfilePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

