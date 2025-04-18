import './App.css';
import LoginPage from "./pages/LoginPage";
import AdminClubPage from "./pages/AdminClubPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import MembersList from "./pages/MembersList";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/adminClubs" element={<AdminClubPage/>}/>
                    <Route path="/members" element={<MembersList/>}/>
                    <Route path="/adminProf" element={<AdminProfilePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
