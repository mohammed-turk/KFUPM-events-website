import React from "react";
import Header from "../../components/Header";
import Member from "../../components/Member";
import m1 from "../../assets/member1.jpg";
import m2 from "../../assets/member2.jpg";

function MembersList() {
    return (
        <div>
            <Header/>
            <div className="pageBody" id={"membersPage"}>
                <h1 id={"membersTitle"}>Members</h1>
                <input type={"text"} placeholder={"Search"} className="search"/>

                <div className="members">
                    <Member src={m1} name={"User1"}/>
                    <Member src={m2} name={"User2"}/>
                </div>
            </div>
        </div>
    )
}

export default MembersList;