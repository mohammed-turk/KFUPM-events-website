import React from "react";
import {useNavigate} from "react-router-dom";

const EventsContainer = ({ events, max}) => {
    const navigate = useNavigate();

    const eventsContainer = {
        display: "flex",
        flexWrap: "nowrap",
        gap: "10px",
        overflowX: "auto",
        paddingBottom: "10px",
        overflow: "auto",
        scrollbarColor: "darkblue transparent",
        scrollbarWidth: "thin",
    };

    const eventCard = {
        backgroundColor: "#f1f5f9",
        borderRadius: "10px",
        width: "220px",
        height: "250px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        cursor: "pointer",
        overflow: "hidden",
        flexShrink: 0,
    };

    const eventPosterContainer = {
        height: "180px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        overflow: "hidden",
    };

    const eventPoster = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    const eventInfo = {
        padding: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "70px",
    };

    const providerDate = {
        fontSize: "0.85rem",
        color: "#475569",
        textAlign: "center",
        margin: 0,
    };

    function handleClick(eventId){
        // Navigate to event details
        navigate(`/event/${eventId}`, {
            state: {
                eventData: events.find(event => event._id === eventId)
            }
        });
    };

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <div style={eventsContainer}>
            {events.length > 0 ? (
                shuffle(events).slice(0, max).map((event, index) => (
                    <button
                        key={event._id || index}
                        style={eventCard}
                        onClick={() => handleClick(event._id)}
                    >
                        <div style={eventPosterContainer}>
                            <img
                                src={event.posterURL}
                                alt={`Event ${index + 1}`}
                                style={eventPoster}
                                onError={(e) => {
                                    e.target.onerror = null;
                                }}
                            />
                        </div>
                        <div style={eventInfo}>
                            <p style={providerDate}>
                                {event.provider}
                                <br />
                                {event.timing}
                            </p>
                        </div>
                    </button>
                ))
            ) : (
                <p><em>
                    No events available for this club.
                </em></p>
            )}
        </div>

    );
};

export default EventsContainer;