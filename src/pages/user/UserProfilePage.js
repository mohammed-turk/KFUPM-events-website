import React from "react";
import Header from "../../components/Header";
import EventMod from "../../components/Event&Mod";
import m1 from "../../assets/member1.jpg";
import e1 from "../../assets/event1.jpg";
import e2 from "../../assets/event2.jpg";
import c1 from "../../assets/club.jpg";

function UserProfilePage() {
    let ResClub = 5;

    return (
        <div>
            <Header/>
            <div className="pageBody">
                <div className={"info"}>
                    <img src={m1} alt="Member Profile Pic" className={"profImg"}/>
                    <h1>User 1</h1>
                </div>
                <h2>Favorite Events</h2>
                <div className={"EventsList"}>
                    <EventMod src={e1} user={2}/>
                    <EventMod src={e2}/>
                </div>

                <h2>Joined clubs</h2>
                <div className={"EventsList"}>
                    <div className={"joinedClub"}>
                        <img src={c1} alt={"Club Icon"} className={"memberPic"}/>
                        <h3>club</h3>
                    </div>
                    <div className={"joinedClub"}>
                        <img src={c1} alt={"Club Icon"} className={"memberPic"}/>
                        <h3>club</h3>
                    </div>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default UserProfilePage;