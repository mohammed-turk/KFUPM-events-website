import React from "react";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import {useNavigate} from "react-router-dom";

function Header(prob) {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/adminProf'); // Example route for AdminProfilePage
    };

    const goToProfile = () => {
        if (prob.type.toLowerCase().includes("admin")) {
            navigate("/adminProf");
        } else if (prob.type.toLowerCase().includes("org")) {
            navigate("org/HomeOrg");
        } else {
            navigate("User/HomeUser");
        }

    };

    return (<div>
        <div className="HeaderItems">
            <button className={"headerBtn"} onClick={goHome}>Home</button>
            <h3 className="mode">{prob.type}</h3>
            <button className={"headerBtn"} onClick={goToProfile}>Profile</button>
        </div>
        <hr/>
    </div>)
}

Header.defaultProps = {type: ""}

export default Header;