import React from "react";

function Event(prob) {
    return (
        <div className="event">
            <img src={prob.src} alt="Event Poster" className="eventPoster"/>
            <h2 className={"eventTitle"}>Event Title</h2>
        </div>
    )
}

export default Event;