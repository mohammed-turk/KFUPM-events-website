import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Sample event data - replace with your actual event data in a production app
const eventsData = [
  { 
    id: 101, 
    title: "Camp Night", 
    description: "Join us for a night under the stars! We'll have campfires, stargazing, and great company.",
    provider: "Outdoor Club", 
    date: "May 15, 2025", 
    time: "7:00 PM - 6:00 AM", 
    location: "Forest Park, North Area",
    capacity: 30,
    registrationDeadline: "May 10, 2025",
    organizer: "John Smith",
    contactEmail: "outdoorclub@university.edu"
  },
  { 
    id: 102, 
    title: "Winter Event", 
    description: "Celebrate the winter season with music, hot chocolate, and winter activities!",
    provider: "Cultural Club", 
    date: "May 20, 2025", 
    time: "6:00 PM - 10:00 PM", 
    location: "Student Center, Main Hall",
    capacity: 100,
    registrationDeadline: "May 18, 2025",
    organizer: "Sarah Johnson",
    contactEmail: "culturalclub@university.edu"
  }
];

function EventInfo() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check if event data was passed via location state
    if (location.state?.eventData) {
      setEvent(location.state.eventData);
    } else {
      // If not, find the event by ID in our sample data
      // In a real app, you would fetch this from an API
      const foundEvent = eventsData.find(e => e.id === parseInt(eventId));
      
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }
    setLoading(false);
  }, [eventId, location.state]);

  const handleGoBack = () => {
    navigate("/user/home");
  };

  const handleRegister = () => {
    // In a real app, you would handle event registration here
    alert("Registration successful! You'll receive a confirmation email soon.");
  };

  if (loading) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>Loading event information...</h2>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>Event not found</h2>
          <p>Sorry, we couldn't find information for this event.</p>
          <button style={buttonStyle} onClick={handleGoBack}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        <div style={headerSection}>
          <button style={backButton} onClick={handleGoBack}>
            ← Back
          </button>
          <h1 style={titleStyle}>{event.title}</h1>
        </div>

        <div style={contentSection}>
          <div style={eventBanner}>
            <div style={dateTimeSection}>
              <div style={dateBox}>
                <p style={monthStyle}>{event.date.split(' ')[0]}</p>
                <p style={dayStyle}>{event.date.split(' ')[1].replace(',', '')}</p>
              </div>
              <div style={timeLocation}>
                <p style={timeStyle}><strong>Time:</strong> {event.time}</p>
                <p style={locationStyle}><strong>Location:</strong> {event.location}</p>
              </div>
            </div>
          </div>

          <div style={infoSection}>
            <h2 style={sectionTitle}>About This Event</h2>
            <p style={descriptionStyle}>{event.description}</p>
          </div>

          <div style={detailsContainer}>
            <div style={detailBox}>
              <h3 style={detailTitle}>Provider</h3>
              <p style={detailValue}>{event.provider}</p>
            </div>
            
            <div style={detailBox}>
              <h3 style={detailTitle}>Capacity</h3>
              <p style={detailValue}>{event.capacity} people</p>
            </div>
          </div>

          <div style={infoSection}>
            <h2 style={sectionTitle}>Registration Information</h2>
            <p style={infoStyle}><strong>Deadline:</strong> {event.registrationDeadline}</p>
            <p style={infoStyle}><strong>Organizer:</strong> {event.organizer}</p>
            <p style={infoStyle}><strong>Contact:</strong> {event.contactEmail}</p>
          </div>

          <div style={actionSection}>
            <button 
              style={{...buttonStyle, backgroundColor: "#3b82f6"}}
              onClick={handleRegister}
            >
              Register for Event
            </button>
            <button style={{...buttonStyle, backgroundColor: "#22c55e"}}>
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const container = {
  padding: "30px",
  backgroundColor: "rgb(160, 179, 197)",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const card = {
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "32px",
  width: "100%",
  maxWidth: "800px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
  marginTop: "20px",
};

const headerSection = {
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
  position: "relative",
};

const backButton = {
  backgroundColor: "#f1f5f9",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  marginRight: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#475569",
  position: "absolute",
  left: 0,
};

const titleStyle = {
  fontSize: "2.2rem",
  fontWeight: "bold",
  margin: "0 auto",
  color: "#1f2937",
  textAlign: "center",
};

const contentSection = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
};

const eventBanner = {
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "16px",
};

const dateTimeSection = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const dateBox = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  padding: "12px",
  minWidth: "80px",
  textAlign: "center",
  color: "white",
};

const monthStyle = {
  fontSize: "1rem",
  margin: "0 0 4px 0",
  fontWeight: "bold",
};

const dayStyle = {
  fontSize: "1.8rem",
  margin: 0,
  fontWeight: "bold",
};

const timeLocation = {
  flex: 1,
};

const timeStyle = {
  fontSize: "1.1rem",
  margin: "0 0 8px 0",
  color: "#334155",
};

const locationStyle = {
  fontSize: "1.1rem",
  margin: 0,
  color: "#334155",
};

const infoSection = {
  marginBottom: "8px",
};

const sectionTitle = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "#334155",
  marginBottom: "12px",
};

const descriptionStyle = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#475569",
};

const infoStyle = {
  fontSize: "1.1rem",
  margin: "0 0 8px 0",
  color: "#475569",
};

const detailsContainer = {
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
};

const detailBox = {
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  padding: "16px 24px",
  flex: "1 1 calc(50% - 12px)",
  minWidth: "200px",
};

const detailTitle = {
  fontSize: "0.9rem",
  color: "#64748b",
  marginBottom: "8px",
  fontWeight: "500",
};

const detailValue = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "#334155",
};

const actionSection = {
  display: "flex",
  gap: "16px",
  marginTop: "16px",
};

const buttonStyle = {
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px 24px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  flex: 1,
};

export default EventInfo;