import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import React, { useState, useEffect } from "react";

// Dynamically load club icons
const clubIcons = Array.from({ length: 8 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);

function HomeAdmin() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/events");
        
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Fetched events:", data);
        
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API response is not an array:", data);
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleClubClick = (clubId) => {
    navigate(`/admin/club/${clubId}`);
  };

  const handleEventClick = (eventId) => {
    navigate(`/admin/event/${eventId}`);
  };

  const showAll = () => {
    navigate("/admin/clubsList");
  };

  const showMore = () => {
    navigate("/admin/eventList");
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "rgb(160, 179, 197)",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <HOmePageHeader name="admin" />

      {/* Clubs Section */}
      <section style={sectionBox}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Clubs & Colleges</h2>
          <button style={sectionButton} onClick={showAll}>
            Show All
          </button>
        </div>
        
        <div style={scrollContainer}>
          <div style={clubsGrid}>
            {clubIcons.map((icon, index) => (
              <button
                key={index}
                style={clubItem}
                onClick={() => handleClubClick(index + 1)}
              >
                <img src={icon} alt={`Club ${index + 1}`} style={clubIconStyle} />
              </button>
            ))}
          </div>
          
          {/* Simple scroll indicator */}
          <div style={scrollIndicator}>
            <div style={scrollTrack}>
              <div style={scrollThumb}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section style={sectionBox}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Events</h2>
          <button style={sectionButton} onClick={showMore}>
            &gt; <span style={{ marginLeft: 6 }}>Show more</span>
          </button>
        </div>
        
        <div style={scrollContainer}>
          <div style={eventsCarousel}>
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p>Error loading events: {error}</p>
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <button
                  key={event._id || index}
                  style={eventCard}
                  onClick={() => handleEventClick(event._id)}
                >
                  <div style={eventPosterContainer}>
                    <img
                      src={event.posterURL || require(`../../assets/event${index % 2 + 1}.jpg`)}
                      alt={`Event ${index + 1}`}
                      style={eventPoster}
                      onError={(e) => {
                        e.target.src = require(`../../assets/event${index % 2 + 1}.jpg`);
                      }}
                    />
                  </div>
                  <div style={eventInfo}>
                    <p style={providerDate}>
                      Provider
                      <br />
                      Date Time
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div style={noEventsContainer}>
                <p>No events available.</p>
                <button 
                  style={{...sectionButton, marginTop: "10px"}} 
                  onClick={() => navigate("/admin/eventList/addEvent")}
                >
                  Add New Event
                </button>
              </div>
            )}
          </div>
          
          {/* Simple scroll indicator */}
          <div style={scrollIndicator}>
            <div style={scrollTrack}>
              <div style={scrollThumb}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeAdmin;

// === Styles ===

const sectionBox = {
  backgroundColor: "rgba(64, 92, 118, 0.76)",
  borderRadius: "16px",
  padding: "24px 32px",
  marginBottom: "30px",
  width: "100%",
  maxWidth: "1200px",
  marginInline: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const sectionTitle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: 0,
  color: "#1f2937",
};

const sectionButton = {
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const scrollContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const clubsGrid = {
  display: "flex",
  overflowX: "auto",
  gap: "20px",
  paddingBottom: "10px",
};

const clubItem = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  minWidth: "100px",
  height: "100px",
  overflow: "hidden",
  padding: 0,
  border: "2px solid transparent",
  transition: "border-color 0.3s ease, transform 0.2s ease",
  cursor: "pointer",
  flex: "0 0 auto",
};

const clubIconStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const eventsCarousel = {
  display: "flex",
  overflowX: "auto",
  gap: "20px",
  paddingBottom: "10px",
  minHeight: "250px",
};

const eventCard = {
  backgroundColor: "#f1f5f9",
  borderRadius: "10px",
  minWidth: "220px",
  flex: "0 0 auto",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
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
};

const providerDate = {
  fontSize: "0.85rem",
  color: "#475569",
  margin: 0,
  textAlign: "center",
};

const noEventsContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "20px",
};

// Simple scroll indicator
const scrollIndicator = {
  width: "100%",
  height: "10px",
  display: "flex",
  justifyContent: "center",
};

const scrollTrack = {
  width: "50%",
  height: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "2px",
  position: "relative",
};

const scrollThumb = {
  position: "absolute",
  left: "0",
  top: "0",
  height: "100%",
  width: "100px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  borderRadius: "2px",
};