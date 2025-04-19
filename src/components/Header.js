import React from "react";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import {useNavigate} from "react-router-dom";

function Header(prob) {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/adminProf'); // Example route for AdminProfilePage
    };

    return (<div>
        <div className="HeaderItems">
            <button className={"homeBtn"} onClick={goHome}>Home</button>
            <h3 className="mode">{prob.type}</h3>
        </div>
        <hr/>
    </div>)
}

Header.defaultProps = {type: " "}

export default Header;