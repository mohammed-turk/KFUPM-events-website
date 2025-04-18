import React from "react";
import Header from "../Components/Header";
import Event from "../Components/Event";

function AdminClubPage(){
    return (
        <div>
            <Header/>
            <div id={"ClubInfo"}>
                <img src={"/images/club.png"} alt="club"/>
                <h2>Club name</h2>
                <p>This club is the best club ever. It offers wonderful events,
                    fruitful lectures, and innovative contests. Join our club now!!</p>
            </div>
            <div id={"Events"}>
                <h2>Events</h2>
                <Event/>
                <Event/>
            </div>
        </div>
    );
}

export default AdminClubPage;