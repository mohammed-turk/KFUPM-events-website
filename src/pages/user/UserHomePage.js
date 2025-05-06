import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg";

function HomeUser() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch both clubs and events when component mounts
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch events
        const eventsRes = await fetch("http://localhost:3000/api/events");
        if (!eventsRes.ok) {
          throw new Error(`Events API returned ${eventsRes.status}`);
        }
        const eventsData = await eventsRes.json();
        
        // Fetch clubs
        const clubsRes = await fetch("http://localhost:3000/api/clubs");
        if (!clubsRes.ok) {
          throw new Error(`Clubs API returned ${clubsRes.status}`);
        }
        const clubsData = await clubsRes.json();
        
        console.log("Fetched events:", eventsData);
        console.log("Fetched clubs:", clubsData);
        
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        } else {
          console.error("Events API response is not an array:", eventsData);
          setEvents([]);
        }
        
        if (Array.isArray(clubsData)) {
          setClubs(clubsData);
        } else {
          console.error("Clubs API response is not an array:", clubsData);
          setClubs([]);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClubClick = (club) => {
    if (!club || !club._id) {
      console.error("Attempted to navigate to club with missing ID");
      return;
    }
    
    navigate(`/club/${club._id}`, {
      state: {
        clubData: club
      }
    });
  };

  const handleEventClick = (eventId) => {
    // Navigate to event details
    navigate(`/event/${eventId}`, {
      state: {
        eventData: events.find(event => event._id === eventId)
      }
    });
  };

  const showAll = () => {
    navigate("/ClubsList");
  };

  const showMore = () => {
    navigate("/EventList");
  };

  return (
    <div style={pageContainer}>
      {/* Header */}
      <HOmePageHeader name="user" />

      {/* Clubs Section */}
      <section style={sectionBox}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Clubs & Colleges</h2>
          <button style={sectionButton} onClick={showAll}>
            Show All
          </button>
        </div>
        
        <div>
          {loading ? (
            <p>Loading clubs...</p>
          ) : error ? (
            <p>Error loading clubs: {error}</p>
          ) : clubs.length > 0 ? (
            <div style={horizontalScrollContainer}>
              {clubs.map((club, index) => (
                <button
                  key={club._id || index}
                  style={clubItem}
                  onClick={() => handleClubClick(club)}
                  title={club.name}
                >
                  <img
                    src={club.iconURL}
                    alt={club.name}
                    style={clubIcon}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                </button>
              ))}
            </div>
          ) : (
            <p>No clubs available.</p>
          )}
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
        
        <div>
          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p>Error loading events: {error}</p>
          ) : events.length > 0 ? (
            <div style={eventsContainer}>
              {events.slice(0, 4).map((event, index) => (
                <button
                  key={event._id || index}
                  style={eventCard}
                  onClick={() => handleEventClick(event._id)}
                >
                  <div style={eventPosterContainer}>
                    <img
                      src={event.posterURL || (index % 2 === 0 ? eventPlaceholder : eventPlaceholder2)}
                      alt={`Event ${index + 1}`}
                      style={eventPoster}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = index % 2 === 0 ? eventPlaceholder : eventPlaceholder2;
                      }}
                    />
                  </div>
                  <div style={eventInfo}>
                    <p style={providerDate}>
                      Provider
                      <br />
                      {event.timing ? 
                        event.timing.split('|')[0].replace('date:', '').trim() : 
                        "Date"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomeUser;

// === Styles ===

const pageContainer = {
  padding: "30px",
  backgroundColor: "rgb(160, 179, 197)",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', sans-serif",
};

const sectionBox = {
  backgroundColor: "rgba(64, 92, 118, 0.76)",
  borderRadius: "16px",
  padding: "24px 32px",
  marginBottom: "30px",
  width: "100%",
  maxWidth: "1200px",
  marginInline: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  position: "relative",
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

// Horizontal scroll container for clubs
const horizontalScrollContainer = {
  display: "flex",
  flexWrap: "nowrap",
  gap: "10px",
  overflowX: "auto",
  paddingBottom: "10px",
  // Hide scrollbar for Chrome, Safari and Opera
  "&::-webkit-scrollbar": {
    display: "none"
  },
  // Hide scrollbar for IE, Edge and Firefox
  msOverflowStyle: "none",  // IE and Edge
  scrollbarWidth: "none",   // Firefox
};

const clubItem = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  width: "100px",
  height: "100px",
  overflow: "hidden",
  padding: 0,
  border: "2px solid transparent",
  transition: "transform 0.2s ease",
  cursor: "pointer",
  flexShrink: 0,
};

const clubIcon = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

// Event styles - horizontal scroll container
const eventsContainer = {
  display: "flex",
  flexWrap: "nowrap",
  gap: "10px",
  overflowX: "auto",
  paddingBottom: "10px",
  // Hide scrollbar for Chrome, Safari and Opera
  "&::-webkit-scrollbar": {
    display: "none"
  },
  // Hide scrollbar for IE, Edge and Firefox
  msOverflowStyle: "none",  // IE and Edge
  scrollbarWidth: "none",   // Firefox
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