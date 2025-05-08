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
import HomeAdmin from "./pages/admin/HomeAdmin";
import EventAdmin from "./pages/admin/EventAdmin";
import HomeUser from "./pages/user/UserHomePage";
import HOmeOrg from "./pages/org/HomeOrg";
import LoginPage from "./pages/shared/LoginPage";
import UserAllEventList from "./pages/user/UserAllEventList";
import OrgAllEventList from "./pages/org/OrgAllEventList";
import UserEventPage from "./pages/user/UserEventPage";
// Alsahli
import ClubsList from "./pages/shared/ClubsList";
import EventList from "./pages/shared/EventList";
import AdminClubsList from "./pages/admin/AdminClubsList";
import AddEventPage from "./pages/shared/AddEventPage";
// Custom info pages
import ClubInfo from "./pages/shared/ClubInfo";
import EventInfo from "./pages/shared/EventInfo";

import AdminEventInfo from "./pages/admin/AdminEventInfo";
import EditEventPage from "./pages/admin/EditEventPage";
// Add EditClub component import
import EditClub from "./pages/admin/EditClub";
// Add DeleteTest component import
import DeleteTest from "./pages/admin/DeleteTest";

import React, { useEffect } from "react";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/admin/home" element={<HomeAdmin />} />
          {/* Updated route path to use ID parameter */}
          <Route path="/admin/club/:id" element={<AdminClubPage />} />
          <Route path="/admin/prof" element={<AdminProfilePage />} />
          <Route path="/admin/clubsList" element={<AdminClubsList />} />
          <Route path="/admin/clubsList/addOrg" element={<AddOrgPage />} />
          {/* This is the edit route for clubs */}
          <Route path="/admin/club/edit/:id" element={<EditClub />} />
          <Route path="/admin/event" element={<EventAdmin />} />
          <Route path="/admin/eventList" element={<AdminAllEventList />} />
          <Route path="/admin/eventList/addEvent" element={<AddEventPage />} />
          <Route path="/admin/event/:eventId" element={<AdminEventInfo />} />
          <Route path="/admin/eventList/edit/:eventId" element={<EditEventPage />} />
          {/* Test route for deletion troubleshooting */}
          <Route path="/admin/delete-test" element={<DeleteTest />} />

          <Route path="/user/home" element={<HomeUser />} />
          <Route path="/user/prof" element={<UserProfilePage />} />
          <Route path="/user/eventList" element={<UserAllEventList />} />
          <Route path="/event/:id" element={<UserEventPage/>}/>

          <Route path="/org/home" element={<HOmeOrg />} />
          <Route path="/org/prof" element={<OrgProfilePage />} />
          <Route path="/org/members" element={<MembersList />} />
          <Route path="/org/eventList" element={<OrgAllEventList />} />
          <Route path="/org/addEvent" element={<AddEventPage />} />

          {/* Custom info pages */}
          <Route path="/club/:clubId" element={<ClubInfo />} />
          <Route path="/event/:eventId" element={<EventInfo />} />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/ClubsList" element={<ClubsList />} />
          <Route path="/EventList" element={<EventList />} />
          
          {/* This wildcard route should be last */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;