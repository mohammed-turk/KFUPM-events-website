import React from "react";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import {useNavigate} from "react-router-dom";

function Header({type=""}) {
    const navigate = useNavigate();

    const goProfile = () => {
        type.toLowerCase().includes("admin")? navigate("/admin/prof"): //if
            type.toLowerCase().includes("org")? navigate("/org/prof"): //else if
                navigate("/user/prof"); //else
    }

    const goHome = () => {
        if (type.toLowerCase().includes("admin")) {
            navigate("/admin/home", {replace: true});
        } else if (type.toLowerCase().includes("org")) {
            navigate("/org/home", {replace: true});
        } else {
            navigate("/user/home", {replace: true});
        }
    };

    return (<div>
        <div className="HeaderItems">
            <button className={"headerBtn"} onClick={goHome}>Home</button>
            <h3 className="mode">{type}</h3>
            <button className={"headerBtn"} onClick={goProfile}>Profile</button>
        </div>
        <hr/>
    </div>)
}

export default Header;