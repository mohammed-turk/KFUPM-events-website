import './App.css';
import LoginPage from "./pages/shared/LoginPage";
import AdminClubPage from "./pages/admin/AdminClubPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MembersList from "./pages/org/MembersList";

// grean files imports
import AddEventOrg from "./pages/admin/AddEventOrganization";
import HomeAdmin from './pages/admin/HomeAdmin';
import ClubsListAdmin from './pages/admin/ClubListAdmin';
import EventAdmin from './pages/admin/EventAdmin';

import HomeUser from './pages/User/HomeUser';
import HOmeOrg from './pages/org/HomeOrg';


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

                    <Route path="/admin/HomeAdmin" element={<HomeAdmin/>}/>
                    <Route path="/admin/AddEventOrg" element={<AddEventOrg/>}/>

                    <Route path="/admin/ClubsListAdmin" element={<ClubsListAdmin/>}/>
                    <Route path="/admin/EventAdmin" element={<EventAdmin/>}/>

                    <Route path="/user/HomeUser" element={<HomeUser/>}/>

                    <Route path="/org/HomeOrg" element={<HOmeOrg/>}/>
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
