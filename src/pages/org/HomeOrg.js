import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg";
import editIcon from "../../assets/icons/mod.png";

// Load club icons dynamically
const clubIcons = Array.from({ length: 8 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);

function HomeOrg() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); 
  const loggedInUsername = localStorage.getItem("username"); 

   useEffect(() => {
      const fetchEvents = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/events");
          const data = await res.json();
          console.log("All Events Data:", data);
          if (Array.isArray(data)) {
           
            const organizerEvents = data.filter(
              (event) => event.provider === loggedInUsername
            );
            console.log("Organizer's Events:", organizerEvents);
            setEvents(organizerEvents);
          } else {
            console.error("API response is not an array:", data);
            setEvents([]);
          }
        } catch (err) {
          console.error("Failed to fetch events:", err);
          setEvents([]); 
        }
      };
  
      if (loggedInUsername) {
        fetchEvents();
      } else {
        console.log("Username not found in localStorage. Cannot fetch organizer's events.");
        setEvents([]); 
      }
    }, [loggedInUsername]); 

  const handleClubClick = (clubId) => {
    navigate(`/admin/club/${clubId}`);
  };

  const handleEventClick = (eventId) => {
    navigate(`/admin/event/${eventId}`);
  };

  const showAll = () => {
    navigate("/ClubsList");
  };

  const showMore = () => {
    navigate("/org/eventList");
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
      <HOmePageHeader name="org" />

      {/* Clubs Section */}
      <section style={sectionBox}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Clubs & Colleges</h2>
          <button style={sectionButton} onClick={showAll}>
            Show All
          </button>
        </div>
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
          {events.length > 0 && (
            <>
              {/* Event 1 */}
              <button
                style={eventCard}
                onClick={() => handleEventClick(events[0]?._id)}
              >
                <div style={eventPosterContainer}>
                  <img
                    src={events[0]?.posterURL || eventPlaceholder}
                    alt={events[0]?.title}
                    style={eventPoster}
                  />
                </div>
                <div style={eventInfo}>
                  <p style={providerDate}>
                    {events[0]?.provider || "Provider"}
                    
                  </p>
                  <button style={editButton}>
                    <img src={editIcon} alt="Edit" style={editIconImg} />
                  </button>
                </div>
              </button>

              {/* Event 2 */}
              {events.length > 1 && (
                <button
                  style={eventCard}
                  onClick={() => handleEventClick(events[1]?._id)}
                >
                  <div style={eventPosterContainer}>
                    <img
                      src={events[1]?.posterURL || eventPlaceholder2}
                      alt={events[0]?.title}
                      style={eventPoster}
                    />
                  </div>
                  <div style={eventInfo}>
                    <p style={providerDate}>
                      {events[1]?.provider || "Provider"}
                      
                    </p>
                    <button style={editButton}>
                      <img src={editIcon} alt="Edit" style={editIconImg} />
                    </button>
                  </div>
                </button>
              )}
            </>
          )}
          {events.length === 0 && (
            <p>No events available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomeOrg;

// === Inline Styles ===

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
};

const eventCard = {
  backgroundColor: "#f1f5f9",
  borderRadius: "10px",
  minWidth: "220px",
  flex: "0 0 auto",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
};

const eventPosterContainer = {
  height: "180px", // Increased height for better image display
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  overflow: "hidden",
};

const eventPoster = {
  width: "100%",
  height: "100%",
  objectFit: "cover", // Ensure images cover the container without stretching
  display: "block",
};

const eventInfo = {
  padding: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const providerDate = {
  fontSize: "0.85rem",
  color: "#475569",
};

const editButton = {
  backgroundColor: "#22c55e",
  border: "none",
  borderRadius: "50%",
  width: "28px",
  height: "28px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const editIconImg = {
  width: "16px",
  height: "16px",
};