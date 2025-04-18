import React from "react";
import Header from "../components/Header";
import Event from "../components/Event";
import adminImage from "../assets/admin.jpg";
import e1 from "../assets/event1.jpg";
import e2 from "../assets/event2.jpg";

function AdminProfilePage() {
    let ResClub = 5;

    return (
        <div>
            <Header/>
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
                    <Event src={e1}/>
                    <Event src={e2}/>
                </div>
            </div>
        </div>
    );
}

export default AdminProfilePage;