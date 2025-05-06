import React from "react";
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg";

// Load club icons dynamically
const clubIcons = Array.from({ length: 8 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);

// Sample club data
const clubsData = [
  { id: 1, name: "Cycling Club", description: "For cycling enthusiasts" },
  { id: 2, name: "Cultural Club", description: "Celebrating diverse cultures" },
  { id: 3, name: "Innovation Club", description: "Technology and innovation" },
  { id: 4, name: "Computer Club", description: "For computer science students" },
  { id: 5, name: "Arts Club", description: "Creative arts and performances" },
  { id: 6, name: "Cycling Club 2", description: "Another cycling group" },
  { id: 7, name: "Cultural Club 2", description: "Another cultural group" },
  { id: 8, name: "Innovation Club 2", description: "More tech innovations" },
];

// Sample event data
const eventsData = [
  { 
    id: 101, 
    title: "Camp Night", 
    description: "Join us for a night under the stars!",
    provider: "Outdoor Club", 
    date: "May 15, 2025", 
    time: "7:00 PM"
  },
  { 
    id: 102, 
    title: "Winter Event", 
    description: "Celebrate the winter season!",
    provider: "Cultural Club", 
    date: "May 20, 2025", 
    time: "6:00 PM"
  }
];

function HomeUser() {
  const navigate = useNavigate();

  const handleClubClick = (clubId) => {
    // Navigate to club info page with the club ID as a parameter
    navigate(`/club/${clubId}`, { 
      state: { 
        clubData: clubsData.find(club => club.id === clubId) 
      } 
    });
  };

  const handleEventClick = (eventId) => {
    // Updated to use our new event route with state
    navigate(`/event/${eventId}`, {
      state: {
        eventData: eventsData.find(event => event.id === eventId)
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
    <div
      style={{
        padding: "30px",
        backgroundColor: "rgb(160, 179, 197)",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header (outside section box) */}
      <HOmePageHeader name="user" />

      {/* Clubs Section */}
      <section style={sectionBox}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Clubs & Colleges</h2>
          <button style={sectionButton} onClick={showAll}>
            Show All
          </button>
        </div>
        <div style={clubsGrid}>
          {clubsData.map((club, index) => (
            <button
              key={index}
              style={clubItem}
              onClick={() => handleClubClick(club.id)}
              title={club.name}
            >
              <img 
                src={clubIcons[index]} 
                alt={club.name}
                style={clubIcon} 
              />
            </button>
          ))}
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
        <div style={eventsCarousel}>
          <button style={eventCard} onClick={() => handleEventClick(101)}>
            <div style={eventPosterContainer}>
              <img
                src={eventPlaceholder}
                alt="Event Poster"
                style={eventPoster}
              />
            </div>
            <div style={eventInfo}>
              <p style={providerDate}>
                {eventsData[0].provider}
                <br />
                {eventsData[0].date} • {eventsData[0].time}
              </p>
            </div>
          </button>

          <button style={eventCard} onClick={() => handleEventClick(102)}>
            <div style={eventPosterContainer}>
              <img
                src={eventPlaceholder2}
                alt="Event Poster"
                style={eventPoster}
              />
            </div>
            <div style={eventInfo}>
              <p style={providerDate}>
                {eventsData[1].provider}
                <br />
                {eventsData[1].date} • {eventsData[1].time}
              </p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomeUser;

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

const clubsGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "flex-start",
  alignItems: "center",
};

const clubItem = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  width: "100px",
  height: "100px",
  overflow: "hidden",
  padding: 0,
  border: "2px solid transparent",
  transition: "border-color 0.3s ease, transform 0.2s ease",
  cursor: "pointer",
};

const clubIcon = {
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
};

const eventCard = {
  backgroundColor: "#f1f5f9",
  borderRadius: "10px",
  minWidth: "220px",
  flex: "0 0 auto",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
};

const eventPosterContainer = {
  height: "120px",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  overflow: "hidden",
};

const eventPoster = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const eventInfo = {
  padding: "12px",
  display: "flex",
  justifyContent: "center", // Changed from space-between to center
  alignItems: "center",
};

const providerDate = {
  fontSize: "0.85rem",
  color: "#475569",
  textAlign: "center", // Added center alignment
};