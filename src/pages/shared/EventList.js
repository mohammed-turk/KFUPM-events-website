import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import "./ClubList.css";
import { useNavigate } from "react-router-dom";

function EventsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const detailsButtonRefs = useRef({}); // Ref to hold button elements

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API response is not an array:", data);
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Check button overflow after the component renders
    Object.keys(detailsButtonRefs.current).forEach(eventId => {
      const button = detailsButtonRefs.current[eventId];
      const container = button?.parentElement;
      if (button && container && button.offsetWidth > container.offsetWidth) {
        button.style.fontSize = '12px'; // Reduce font size if overflowing
        button.style.padding = '3px 6px'; // Adjust padding as well
      } else if (button) {
        // Revert to default size if no longer overflowing
        button.style.fontSize = '14px';
        button.style.padding = '5px 10px';
      }
    });
  }, [events]); // Re-run effect when events update

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToMyList = (id) => {
    setEvents(
      events.map((event) =>
        event._id === id ? { ...event, added: !event.added } : event
      )
    );
  };

  const handleDetailsClick = (id) => {
    navigate(`/events/${id}`);
  };

  const formatTiming = (timing) => {
    if (typeof timing === 'object' && timing !== null) {
      return `${timing.date || ''} | ${timing.time || ''}`;
    }
    return timing;
  };

  const filteredEvents = events.filter((event) =>
    event.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatTiming(event.timing)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="pageBody">
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          Events Listing
        </h1>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />
        </div>

        <h2>All Events</h2>

        <div
          className="EventsList"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                width: "300px",
                backgroundColor: "#f0f8ff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "200px",
                  backgroundColor: "#2d5ba9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  padding: "10px",
                }}
              >
                <img
                  src={event.posterURL}
                  alt={event.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
              </div>
              <div
                style={{
                  backgroundColor: "#4286f4",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ color: "white", flexGrow: 1, marginRight: "10px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  <p style={{ marginBottom: "5px" }}>{event.provider}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <button
                    onClick={() => handleAddToMyList(event._id)}
                    style={{
                      backgroundColor: event.added ? "#ff9800" : "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      fontSize: "18px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                    title={
                      event.added ? "Remove from my list" : "Add to my list"
                    }
                  >
                    {event.added ? "✓" : "+"}
                  </button>
                  <button
                    ref={el => (detailsButtonRefs.current[event._id] = el)} // Attach ref
                    onClick={() => navigate(`/event/${event._id}`)}
                    style={{
                      backgroundColor: "darkblue",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default EventsList;