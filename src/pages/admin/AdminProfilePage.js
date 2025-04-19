import React from "react";
import Header from "../../components/Header";
import EventMod from "../../components/Event&Mod";
import adminImage from "../../assets/admin.jpg";
import e1 from "../../assets/event1.jpg";
import e2 from "../../assets/event2.jpg";

function AdminProfilePage() {
    let ResClub = 5;

    return (
        <div>
            <Header type={"Admin Mode"}/>
            <div className="pageBody">
                <div className={"info"}>
                    <img src={adminImage} alt="Admin Profile Pic" className={"profImg"}/>
                    <div>
                        <h1>Admin name</h1>
                        <p>{ResClub} Responsible clubs</p>
                    </div>
                </div>
                <h2>Events</h2>
                <div className={"EventsList"}>
                    <EventMod src={e1} user={1}/>
                    <EventMod src={e2} user={1}/>
                </div>
            </div>
        </div>
    );
}

export default AdminProfilePage;