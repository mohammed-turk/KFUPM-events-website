import React from "react";

function Member(prob) {
    return (
        <div className="MemberElement">
            <img src={prob.src} alt={"user Profile Pic"} className={"memberPic"}/>
            <p style={{paddingRight:"12%"}}>{prob.name}</p>
        </div>
    )
}

export default Member;