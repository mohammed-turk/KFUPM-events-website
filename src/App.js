import "./App.css";
import LoginPage from "./pages/shared/LoginPage";
import AdminClubPage from "./pages/admin/AdminClubPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MembersList from "./pages/org/MembersList";
import ClubsList from "./pages/shared/ClubsList";
import AdminClubsList from "./pages/admin/AdminClubsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminClubs" element={<AdminClubPage />} />
          <Route path="/members" element={<MembersList />} />
          <Route path="/adminProf" element={<AdminProfilePage />} />
          <Route path="/ClubsList" element={<ClubsList />} />
          <Route path="/AdminClubsList" element={<AdminClubsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
