import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import AdminAllEventList from './pages/admin/AdminAllEventList';
import AdminClubPage from "./pages/admin/AdminClubPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MembersList from "./pages/org/MembersList";
import LoginPage from "./pages/shared/LoginPage";
// Make sure to import UserAllEventList component from the correct path
// Assuming it's in the pages/user directory:
import UserAllEventList from "./pages/user/UserAllEventList";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/adminClubs" element={<AdminClubPage />} />
                    <Route path="/members" element={<MembersList />} />
                    <Route path="/adminProf" element={<AdminProfilePage />} />
                    <Route path="/admin/AdminAllEventList" element={<AdminAllEventList />} />
                    <Route path="/user/UserAllEventList" element={<UserAllEventList />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;