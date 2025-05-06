import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import EventMod from "../../components/Event&Mod";
import e1 from "../../assets/event1.jpg";
import c1 from "../../assets/club.jpg";

function AdminClubPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [club, setClub] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("AdminClubPage - Club ID from params:", id);
        console.log("AdminClubPage - Location state:", location.state);
        
        // Try to get club data from location state first
        if (location.state?.clubData) {
            console.log("AdminClubPage - Using club data from state:", location.state.clubData);
            setClub(location.state.clubData);
            fetchClubEvents(location.state.clubData._id);
        } else if (id) {
            // Otherwise fetch from API
            console.log("AdminClubPage - Fetching club data for ID:", id);
            fetchClubData();
        } else {
            // No ID parameter and no state
            console.error("AdminClubPage - No club ID provided");
            setError("No club ID provided");
            setLoading(false);
        }
    }, [id, location.state]);

    const fetchClubData = async () => {
        try {
            setLoading(true);
            console.log("AdminClubPage - Fetching club data from API for ID:", id);
            
            const response = await fetch(`http://localhost:3000/api/clubs/${id}`);
            console.log("AdminClubPage - Club API response status:", response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`AdminClubPage - Failed to fetch club data: ${response.status} - ${errorText}`);
                throw new Error(`Failed to fetch club data: ${response.status}`);
            }
            
            const clubData = await response.json();
            console.log("AdminClubPage - Fetched club data:", clubData);
            setClub(clubData);
            
            // After getting club data, fetch related events
            fetchClubEvents(clubData._id);
            
        } catch (err) {
            console.error("AdminClubPage - Error fetching club data:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchClubEvents = async (clubId) => {
        try {
            console.log("AdminClubPage - Fetching events for club ID:", clubId);
            const response = await fetch(`http://localhost:3000/api/events?clubId=${clubId}`);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`AdminClubPage - Failed to fetch events: ${response.status} - ${errorText}`);
                throw new Error(`Failed to fetch events: ${response.status}`);
            }
            
            const eventsData = await response.json();
            console.log("AdminClubPage - Fetched events:", eventsData);
            setEvents(eventsData);
            
        } catch (err) {
            console.error("AdminClubPage - Error fetching club events:", err);
            // Don't set error state here, we can still show the club without events
        } finally {
            setLoading(false);
        }
    };

    // Handle error cases
    if (error) {
        return (
            <div>
                <Header type={"Admin Mode"}/>
                <div className={"pageBody"}>
                    <div className="error-container">
                        <h2>Error Loading Club</h2>
                        <p>{error}</p>
                        <button onClick={() => navigate("/admin/clubsList")}>
                            Return to Clubs List
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <Header type={"Admin Mode"}/>
                <div className={"pageBody"}>
                    <p className="loading-message">Loading club information...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header type={"Admin Mode"}/>
            <div className={"pageBody"}>
                <div className={"info"}>
                    <img 
                        className={"profImg"} 
                        src={club?.iconURL || c1} 
                        alt="club"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = c1;
                        }}
                    />
                    <div>
                        <h2>{club?.name || "Club name"}</h2>
                        <p>{club?.description || "This club is the best club ever. It offers wonderful events, fruitful lectures, and innovative contests. Join our club now!!"}</p>
                    </div>
                </div>
                <h2>Events</h2>
                <div className={"EventsList"}>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <EventMod 
                                key={event._id}
                                event={event}
                                src={event.posterURL || e1} 
                                user={1}
                            />
                        ))
                    ) : (
                        <EventMod src={e1} user={1}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminClubPage;