import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg";
import editIcon from "../../assets/icons/mod.png";
import EventMod from "../../components/Event&Mod";
import e1 from "../../assets/event1.jpg";
import c1 from "../../assets/club.jpg";
// Load club icons dynamically
const clubIcons = Array.from({ length: 8 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);



function HomeOrg() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); 
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUsername = localStorage.getItem("username");
   const [club, setClub] = useState(""); 
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
          const organizerEvents = eventsData.filter(
            (event) => event.provider === loggedInUsername
          );
          setEvents(organizerEvents);
        } else {
          console.error("Events API response is not an array:", eventsData);
          setEvents([]);
        }
        
        if (Array.isArray(clubsData)) {
          setClubs(clubsData);
          console.log("Clubs data:", loggedInUsername);
          setClub(clubsData.find((club) => club.name === loggedInUsername));
          console.log(",,,",club)
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
  }, [loggedInUsername]); 

  
  const handleClubClick = (club) => {
    if (!club || !club._id) {
      console.error("Attempted to navigate to club with missing ID");
      return;
    }
    
    navigate(`/admin/club/${club._id}`, {
      state: {
        clubData: club
      }
    });
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
    <div
      style={{
        padding: "30px",
        backgroundColor: "rgb(160, 179, 197)",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <HOmePageHeader type= {getUserRole()} />

      {/* Clubs Section */}
      <div className={"pageBody"}>
                <div className={"info"}>
                    <img 
                        className={"profImg"} 
                        src={club?.iconURL || c1} 
                        alt="club"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = c1;
                        }}
                    />
                    <div>
                        <h2>{club?.name || "Club name"}</h2>
                        <p>{club?.description || "This club is the best club ever. It offers wonderful events, fruitful lectures, and innovative contests. Join our club now!!"}</p>
                    </div>
                </div>
                
            </div>

      
     
     

      {/* Events Section */}
      <section style={sectionBox}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Events</h2>
          <button 
            onClick={() => navigate("./addEvent")}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "line",

              width: "160px",
              height: "40px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            add event
          </button>
        </div>
        <div style={eventsCarousel}>
          

        {
          events.map( event => (
            <button
              key={event._id}
              style={eventCard}
              onClick={() => handleEventClick(event._id)}
            >
              <div style={eventPosterContainer}>
                <img
                  src={event.posterURL || eventPlaceholder}
                  alt={event.title}
                  style={eventPoster}
                />
              </div>
              <div style={eventInfo}>
                <p style={providerDate}>
                  {event.provider || "Provider"}
                  
                </p>
                
              </div>
            </button>
          ))
        }
          
          
            
          
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