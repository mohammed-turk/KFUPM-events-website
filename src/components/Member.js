import React from "react";

function Member(prob) {
    return (
        <div className="MemberElement">
            <img src={prob.src} alt={"User Profile Pic"} className={"memberPic"}/>
            <p style={{paddingRight:"12%"}}>{prob.name}</p>
        </div>
    )
}

export default Member;