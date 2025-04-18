import React from "react";
import mod from "../assets/icons/mod.png";

function EventMod(prob) {
    return (
        <div className="event">
            <img src={prob.src} alt="EventMod Poster" className="eventPoster"/>
            <div className={"posterData"}>
                <h3 className={"eventTitle"}>EventMod Title</h3>
                <img src={mod} alt={"mod button"} className="icon"/>
            </div>
        </div>
    )
}

export default EventMod;