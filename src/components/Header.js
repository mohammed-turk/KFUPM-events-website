import React from "react";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import {useNavigate} from "react-router-dom";

function Header(prob) {
    const navigate = useNavigate();

    const goProfile = () => {
        prob.type.toLowerCase().includes("admin")? navigate("/admin/prof"): //if
            prob.type.toLowerCase().includes("org")? navigate("/org/prof"): //else if
                navigate("/user/prof"); //else
    }

    const goHome = () => {
        if (prob.type.toLowerCase().includes("admin")) {
            navigate("/admin/home", {replace: true});
        } else if (prob.type.toLowerCase().includes("org")) {
            navigate("/org/home", {replace: true});
        } else {
            navigate("/user/home", {replace: true});
        }
    };

    return (<div>
        <div className="HeaderItems">
            <button className={"headerBtn"} onClick={goHome}>Home</button>
            <h3 className="mode">{prob.type}</h3>
            <button className={"headerBtn"} onClick={goProfile}>Profile</button>
        </div>
        <hr/>
    </div>)
}

Header.defaultProps = {type: ""}

export default Header;