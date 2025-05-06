import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg";
import editIcon from "../../assets/icons/mod.png";


// Load club icons dynamically
const clubIcons = Array.from({ length: 8 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);

// Sample club data - you can replace this with your actual data
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

/////fetchin clubs info
function HomeUser() {

  const [clubs, setClubs] = useState([]);


  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/clubs");
        const data = await res.json();
        setClubs(data);
      } catch (err) {
        console.error("Failed to fetch clubs:", err);
      }
    };

    fetchClubs();
  }, []);
///////

/// events fetching
{/*
const [events, setEvents]=useState([])

useEffect(()=>{
  const fetchEvents= async()=>{
    try{
      const res = await fetch("http://localhost:3000/api/events")
      const data=await res.json();
      setEvents(data.events);
    }
    catch(err){
      console.error("Failed to fetch events:", err);
    }
  }
  fetchEvents();
},[]);
*/}

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        console.log(data);
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API response is not an array:", data);
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleClubClick = (clubId) => {
    navigate(`/club/${clubId}`, {
      state: {
        clubData: clubsData.find(club => club.id === clubId)
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
          {clubs.slice(0,20).map((club, index) => (
            <button
              key={index}
              style={clubItem}
              onClick={() => handleClubClick(club.id)}
              title={club.name}
            >
              <img
                  src={club.iconURL || "https://via.placeholder.com/120"}
                  alt={club.name}
                  className="club-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/120";
                  }}
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
                    alt="Event Poster 1"
                    style={eventPoster}
                  />
                </div>
                <div style={eventInfo}>
                  <p style={providerDate}>
                    {events[0]?.provider || "Provider"}
                    <br />
                    {events[0]?.timing?.date || "Date"} {events[0]?.timing?.time || "Time"}
                  </p>
                </div>
              </button>

          
        {events.map((event,index)=>(
            <button style={eventCard} /**onClick={() => handleEventClick(101)}*/>
            <div style={eventPosterContainer}>
              <img
                src={event.posterURL}
                alt="Event Poster"
                style={eventPoster}
              />
              
            </div>
            <div style={eventInfo}>
              <p style={providerDate}>
                {event.title}
                <br />
                {event.timing}
              </p>
              
            </div>
          </button>
          ))}
          
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
                provider
                <br />
                Date & time
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
                      alt="Event Poster 2"
                      style={eventPoster}
                    />
                  </div>
                  <div style={eventInfo}>
                    <p style={providerDate}>
                      {events[1]?.provider || "Provider"}
                      <br />
                      {events[1]?.timing?.date || "Date"} {events[1]?.timing?.time || "Time"}
                    </p>
                  </div>
                </button>
              )}
            </>
          )}
          {events.length === 0 && (
            <p>No events available.</p>
          )}
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
                provider
                <br />
                Date & time
              </p>
              <button style={editButton}>
                <img src={editIcon} alt="Edit" style={editIconImg} />
              </button>
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
  "&:hover": {
    borderColor: "#3b82f6",
    transform: "scale(1.05)",
  },
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
  "&:hover": {
    transform: "translateY(-5px)",
  },
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
  objectFit: "cover",
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