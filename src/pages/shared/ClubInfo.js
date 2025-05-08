import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EventsContainer from "../../components/EventContainer";

function ClubInfo() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id //getting user ID from token
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [joinButtonText, setJoinButtonText] = useState("Join Club");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        setLoading(true);
        
        // First check if club data was passed via location state
        if (location.state?.clubData) {
          setClub(location.state.clubData);
          checkIfJoined(location.state.clubData._id);
          setLoading(false);
          return;
        }
        
        // Otherwise fetch from API
        const response = await fetch(`http://localhost:3000/api/clubs/${clubId}`);
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched club data:", data);
        setClub(data);
        checkIfJoined(data._id);
      } catch (err) {
        console.error("Error loading club:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [clubId, location.state]);

  // Function to check if user has already joined this club
  const checkIfJoined = async(clubId) => {
    const joinedClubs = (await fetch(`http://localhost:3000/api/joined?userid=${userId}`)).json();
    console.log("Joined clubs are: ",await joinedClubs);
    const alreadyJoined = ((await joinedClubs).map(club=>club._id)).includes(clubId);
    
    setIsJoined(alreadyJoined);
    setJoinButtonText(alreadyJoined ? "Leave Club" : "Join Club");
  };

  const handleJoinClub = () => {
    if (!club) return;
    
    if (isJoined) {
      // Leave the club
      const joinedClubs = JSON.parse(localStorage.getItem('joinedClubs') || '[]');
      const updatedClubs = joinedClubs.filter(id => id !== club._id);
      localStorage.setItem('joinedClubs', JSON.stringify(updatedClubs));
      
      // Update button state
      setIsJoined(false);
      setJoinButtonText("Join Club");
      
      // Show feedback to user
      alert(`You have left ${club.name}`);
    } else {
      // Join the club
      const joinedClubs = JSON.parse(localStorage.getItem('joinedClubs') || '[]');
      joinedClubs.push(club._id);
      localStorage.setItem('joinedClubs', JSON.stringify(joinedClubs));
      
      // Update button state
      setIsJoined(true);
      setJoinButtonText("Leave Club");
      
      // Show feedback to user
      alert(`You have joined ${club.name}! Welcome aboard!`);
    }
  };

  const handleContactLeader = () => {
    // In a real app, this would open a chat or email form to contact the club admin
    if (club && club.email) {
      window.location.href = `mailto:${club.email}`;
    } else {
      alert(`Contact information for ${club?.name || 'this club'} is not available.`);
    }
  };

  const handleGoBack = () => {
    navigate("/user/home");
  };

  if (loading) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>Loading club information...</h2>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>Club not found</h2>
          <p>{error || "Sorry, we couldn't find information for this club."}</p>
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
          <h1 style={titleStyle}>{club.name}</h1>
        </div>

        {club.iconURL && (
          <div style={clubIconContainer}>
            <img 
              src={club.iconURL} 
              alt={club.name + " logo"} 
              style={clubIconStyle}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div style={contentSection}>
          <div style={infoSection}>
            <h2 style={sectionTitle}>About</h2>
            <p style={descriptionStyle}>
              {club.description || club.name || "No description available."}
            </p>
          </div>

          <div style={infoSection}>
            <h2 style={sectionTitle}>Events</h2>
            {/*<EventsContainer events={club.events} max={club.events.length} />*/}
          </div>

          <div style={detailsContainer}>
            <div style={detailBox}>
              <h3 style={detailTitle}>Contact</h3>
              <p style={detailValue}>{club.email || "N/A"}</p>
            </div>
          </div>

          <div style={actionSection}>
            <button 
              style={{...buttonStyle, backgroundColor: isJoined ? "red" : "#3b82f6", transition:"0.25s"}}
              onClick={handleJoinClub}
            >
              {joinButtonText}
            </button>
            <button 
              style={{...buttonStyle, backgroundColor: "#22c55e"}}
              onClick={handleContactLeader}
            >
              Contact Leader
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

const clubIconContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px",
};

const clubIconStyle = {
  width: "150px",
  height: "150px",
  objectFit: "contain",
  borderRadius: "8px",
};

const contentSection = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
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
  fontSize: "1.1rem",
  fontWeight: "500",
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

export default ClubInfo;