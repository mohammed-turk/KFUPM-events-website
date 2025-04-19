import './App.css';
import LoginPage from "./pages/shared/LoginPage";
import AdminClubPage from "./pages/admin/AdminClubPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MembersList from "./pages/org/MembersList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserProfilePage from "./pages/user/UserProfilePage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/adminClubs" element={<AdminClubPage/>}/>
                    <Route path="/members" element={<MembersList/>}/>
                    <Route path="/adminProf" element={<AdminProfilePage/>}/>
                    <Route path="/userProf" element={<UserProfilePage/>}/>
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
