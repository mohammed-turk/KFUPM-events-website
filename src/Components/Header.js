import React from "react";
import AdminProfilePage from "../pages/AdminProfilePage";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const userType = "admin";
    let mode = userType === "admin" ? "Admin Mode" :
        userType === "Org" ? "Event Organizer Mode" : "";

    const goHome = () => {
        navigate('/adminProf'); // Example route for AdminProfilePage
    };


    if (userType === "admin") {
        mode = 'Admin Mode'
    } else if (userType === "Org") {
        mode = 'Event Organizer Mode'
    }

    return (<div>
        <div className="HeaderItems">
            <button className={"homeBtn"} onClick={goHome}>Home</button>
            <h3 className="mode">{mode}</h3>
        </div>
        <hr/>
    </div>)
}

export default Header;