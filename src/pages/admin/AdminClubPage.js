import React from "react";
import Header from "../../components/Header";
import EventMod from "../../components/Event&Mod";
import e1 from "../../assets/event1.jpg";
import c1 from "../../assets/club.jpg";

function AdminClubPage() {
    return (
        <div>
            <Header/>
            <div className={"pageBody"}>
                <div className={"info"}>
                    <img className={"profImg"} src={c1} alt="club"/>
                    <div>
                        <h2>Club name</h2>
                        <p>This club is the best club ever. It offers wonderful events,
                            fruitful lectures, and innovative contests. Join our club now!!</p>
                    </div>
                </div>
                <h2>Events</h2>
                <div className={"EventsList"}>
                    <EventMod src={e1}/>
                </div>
            </div>
        </div>
    );
}

export default AdminClubPage;