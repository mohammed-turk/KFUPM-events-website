import React from "react";
import mod from "../assets/icons/mod.png";
import fav from "../assets/icons/fav.png";
function EventMod(prob) {
    let icon = prob.user===1?mod:fav;

    return (
        <div className="event">
            <img src={prob.src} alt="EventMod Poster" className="eventPoster"/>
            <div className={"posterData"}>
                <h3 className={"eventTitle"}>EventMod Title</h3>
                <img src={icon} alt={"mod button"} className="icon"/>
            </div>
        </div>
    )
}

export default EventMod;