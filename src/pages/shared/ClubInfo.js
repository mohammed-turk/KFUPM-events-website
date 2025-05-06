import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Fallback club data in case navigation state is lost on refresh
const clubsData = [
  { id: 1, name: "Cycling Club", description: "For cycling enthusiasts", members: 120, established: "2018", meetingLocation: "Sports Center, Building A" },
  { id: 2, name: "Cultural Club", description: "Celebrating diverse cultures", members: 85, established: "2019", meetingLocation: "Arts Building, Room 203" },
  { id: 3, name: "Innovation Club", description: "Technology and innovation", members: 64, established: "2020", meetingLocation: "Engineering Building, Lab 4" },
  { id: 4, name: "Computer Club", description: "For computer science students", members: 150, established: "2017", meetingLocation: "Technology Center, Room 305" },
  { id: 5, name: "Arts Club", description: "Creative arts and performances", members: 92, established: "2018", meetingLocation: "Fine Arts Building, Studio 12" },
  { id: 6, name: "Cycling Club 2", description: "Another cycling group", members: 45, established: "2021", meetingLocation: "Sports Center, Building B" },
  { id: 7, name: "Cultural Club 2", description: "Another cultural group", members: 78, established: "2020", meetingLocation: "Student Center, Room 110" },
  { id: 8, name: "Innovation Club 2", description: "More tech innovations", members: 55, established: "2022", meetingLocation: "Science Building, Lab 2" },
];

function ClubInfo() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check if club data was passed via location state
    if (location.state?.clubData) {
      // If we have basic club data from navigation state, enhance it with additional details
      const basicClubData = location.state.clubData;
      const fullClubData = clubsData.find(c => c.id === basicClubData.id) || basicClubData;
      setClub(fullClubData);
    } else {
      // If no state (e.g., on direct page load or refresh), find club by ID
      const foundClub = clubsData.find(c => c.id === parseInt(clubId));
      if (foundClub) {
        setClub(foundClub);
      }
    }
    setLoading(false);
  }, [clubId, location.state]);

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

  if (!club) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>Club not found</h2>
          <p>Sorry, we couldn't find information for this club.</p>
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

        <div style={contentSection}>
          <div style={infoSection}>
            <h2 style={sectionTitle}>About</h2>
            <p style={descriptionStyle}>{club.description}</p>
          </div>

          <div style={detailsContainer}>
            <div style={detailBox}>
              <h3 style={detailTitle}>Members</h3>
              <p style={detailValue}>{club.members || "N/A"}</p>
            </div>
            
            <div style={detailBox}>
              <h3 style={detailTitle}>Established</h3>
              <p style={detailValue}>{club.established || "N/A"}</p>
            </div>
          </div>

          <div style={infoSection}>
            <h2 style={sectionTitle}>Meeting Location</h2>
            <p style={locationStyle}>{club.meetingLocation || "To be announced"}</p>
          </div>

          <div style={actionSection}>
            <button style={{...buttonStyle, backgroundColor: "#3b82f6"}}>
              Join Club
            </button>
            <button style={{...buttonStyle, backgroundColor: "#22c55e"}}>
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

const locationStyle = {
  fontSize: "1.1rem",
  color: "#475569",
  fontWeight: "500",
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

export default ClubInfo;