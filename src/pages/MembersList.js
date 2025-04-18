import React from "react";
import Header from "../Components/Header";

function MembersList() {
    return(
        <div>
            <Header/>
            <h1>Members</h1>
            <input type={"text"} value={"Search"}/>
            <div>
                <img src={"userImage.png"} alt={"User Profile Pic"}/>
                <h4>UserName</h4>
            </div>
        </div>
    )
}

export default MembersList;