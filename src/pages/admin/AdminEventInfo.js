import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function AdminEventInfo() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        
        // First check if event data was passed via location state
        if (location.state?.eventData) {
          setEvent(location.state.eventData);
          setLoading(false);
          return;
        }
        
        // Otherwise fetch from API
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        
        const usersList = await fetch("http://localhost:3000/api/users");
        const userData = await usersList.json();
        console.log("Fetched users data:", userData);
        
        
        const user = userData.find((user) => user.username === localStorage.getItem("username"));
        setUserType(user.usertype);
        console.log("User type:", userType);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched event data:", data);
        setEvent(data);
      } catch (err) {
        console.error("Error loading event:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, location.state]);

  const handleGoBack = () => {
    
    navigate("/admin/eventList");
   if (userType === 1) {
    navigate("/org/home");
  }
  
}

  const handleEditEvent = () => {
    // Check if your edit route is properly configured
    // This route should match the path in your App.js
    navigate(`/admin/eventList/edit/${eventId}`, {
      // Optionally pass the current event data to pre-populate the form
      state: { eventData: event }
    });
  };

  const handleDeleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        // Show loading indicator
        setLoading(true);
        
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        alert("Event deleted successfully");
        
        // Navigate to the events list after successful deletion
        navigate("/admin/eventList");
      } catch (err) {
        console.error("Error deleting event:", err);
        alert(`Failed to delete event: ${err.message}`);
        // Stop loading indicator on error
        setLoading(false);
      }
    }
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

  if (error || !event) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>Error loading event</h2>
          <p>{error || "Event not found"}</p>
          <button style={buttonStyle} onClick={handleGoBack}>
            Back to Events
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

        <div style={eventImageContainer}>
          <img 
            src={event.posterURL} 
            alt="Event Poster" 
            style={eventImage}
            onError={(e) => {
              e.target.src = require("../../assets/event1.jpg");
            }}
          />
        </div>

        <div style={contentSection}>
          <div style={infoSection}>
            <h2 style={sectionTitle}>Event Information</h2>
            
            <div style={detailRow}>
              <div style={detailLabel}>Title</div>
              <div style={detailValue}>{event.title}</div>
            </div>
            
            <div style={detailRow}>
              <div style={detailLabel}>Provider</div>
              <div style={detailValue}>{event.provider || "No provider specified"}</div>
            </div>
            
            <div style={detailRow}>
              <div style={detailLabel}>Date</div>
              <div style={detailValue}>
                {event.timing ? event.timing.split('|')[0].replace('date:', '').trim() : "Date not specified"}
              </div>
            </div>
            
            <div style={detailRow}>
              <div style={detailLabel}>Time</div>
              <div style={detailValue}>
                {event.timing ? event.timing.split('|')[1].replace('time:', '').trim() : "Time not specified"}
              </div>
            </div>
            
            <div style={detailRow}>
              <div style={detailLabel}>Location</div>
              <div style={detailValue}>
                {event.info && event.info.includes("QR") ? "تسجيل عبر QR" : "غير محدد"}
              </div>
            </div>
          </div>

          <div style={infoSection}>
            <h2 style={sectionTitle}>Description</h2>
            <div style={descriptionStyle}>
              {event.info || "No description available."}
            </div>
          </div>

          <div style={adminActions}>
            <button 
              style={{...buttonStyle, backgroundColor: "#3b82f6"}}
              onClick={handleEditEvent}
            >
              Edit Event
            </button>
            <button 
              style={{...buttonStyle, backgroundColor: "#ef4444"}}
              onClick={handleDeleteEvent}
            >
              Delete Event
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
  padding: "24px",
  width: "100%",
  maxWidth: "800px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
  marginTop: "20px",
  overflow: "hidden",
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
  fontSize: "1.8rem",
  fontWeight: "bold",
  margin: "0 auto",
  color: "#1f2937",
  textAlign: "center",
};

const eventImageContainer = {
  width: "100%",
  height: "200px",
  borderRadius: "12px",
  overflow: "hidden",
  marginBottom: "24px",
};

const eventImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const contentSection = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const infoSection = {
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "8px",
};

const sectionTitle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#334155",
  marginBottom: "16px",
  paddingBottom: "8px",
  borderBottom: "1px solid #e2e8f0",
};

const detailRow = {
  display: "flex",
  marginBottom: "12px",
  flexDirection: "column",
};

const detailLabel = {
  fontWeight: "500",
  color: "#64748b",
  marginBottom: "4px",
};

const detailValue = {
  color: "#334155",
};

const descriptionStyle = {
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#475569",
};

const adminActions = {
  display: "flex",
  gap: "16px",
  marginTop: "24px",
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
  textAlign: "center",
};

export default AdminEventInfo;