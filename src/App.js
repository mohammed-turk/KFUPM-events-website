import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminAllEventList from "./pages/admin/AdminAllEventList";
import AdminClubPage from "./pages/admin/AdminClubPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MembersList from "./pages/org/MembersList";
import UserProfilePage from "./pages/user/UserProfilePage";
import SignUpPage from "./pages/user/SignUpPage";
import OrgProfilePage from "./pages/org/OrgProfilePage";
import AddOrgPage from "./pages/admin/AddOrgPage";

// green files imports
import AddEventOrg from "./pages/admin/AddEventOrganization";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ClubsListAdmin from "./pages/admin/ClubListAdmin";
import EventAdmin from "./pages/admin/EventAdmin";
import HomeUser from "./pages/user/UserHomePage";
// import HomeUser from "./pages/User/HomeUser";
import HOmeOrg from "./pages/org/HomeOrg";

import LoginPage from "./pages/shared/LoginPage";
// Make sure to import UserAllEventList component from the correct path
// Assuming it's in the pages/user directory:
import UserAllEventList from "./pages/user/UserAllEventList";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>

                    <Route path="/admin/home" element={<HomeAdmin />} />
                    <Route path="/admin/club" element={<AdminClubPage/>}/>
                    <Route path="/admin/prof" element={<AdminProfilePage/>}/>
                    <Route path="/admin/addOrg" element={<AddOrgPage/>}/>
                    <Route path="/admin/clubsList" element={<ClubsListAdmin />} />
                    <Route path="/admin/event" element={<EventAdmin />} />
                    <Route path="/admin/allEvents" element={<AdminAllEventList />}/>


                    <Route path="/user/home" element={<HomeUser />} />
                    <Route path="/user/prof" element={<UserProfilePage/>}/>
                    <Route path="/user/eventList" element={<UserAllEventList />} />


                    <Route path="/org/home" element={<HOmeOrg />} />
                    <Route path="/org/prof" element={<OrgProfilePage/>}/>
                    <Route path="/org/members" element={<MembersList/>}/>

                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
