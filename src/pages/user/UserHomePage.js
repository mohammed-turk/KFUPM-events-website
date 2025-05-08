import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import EventContainer from "../../components/EventContainer";
import ClubsContainer from "../../components/ClubContainer";

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

  function getUserRole() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return null;
    }

    try {
      // Decoding token payload without using a library
      const payload = JSON.parse(atob(token.split(".")[1])); // Extract payload
      return payload.role;
    } catch (err) {
      console.error("Failed to decode token.", err);
      return null;
    }
  }

  return (
    <div style={pageContainer}>
      {/* Header */}
      <HOmePageHeader type={getUserRole()} />

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
            <ClubsContainer clubs={clubs} handleClick={handleClubClick} max={8}/>
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
            <EventContainer events={events} handleEventClick={handleEventClick} max={4}/>
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
