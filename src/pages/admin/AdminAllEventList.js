import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";

function AdminAllEventList() {
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEventClick = (eventId) => {
    navigate(`/admin/event/${eventId}`);
  };

  const filteredEvents = events.filter(event => 
    (event.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (event.provider?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header type={"Admin Mode"}/>
      <div className="pageBody">
        <h1 style={{textAlign: "center", margin: "20px 0"}}>Admin Mode</h1>
        
        {/* Search Bar and Add Button Row */}
        <div style={{
          maxWidth: "600px", 
          margin: "0 auto", 
          padding: "0 20px", 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "80%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "20px"
            }}
          />
          <button 
            onClick={() => navigate("./addEvent")}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            +
          </button>
        </div>
        
        {/* Events List */}
        <h2>All Events</h2>
        <div className="EventsList" style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "20px"
        }}>
          {filteredEvents.map(event => (
            <div 
              key={event._id} 
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                width: "300px",
                backgroundColor: "#f0f8ff",
                cursor: "pointer"
              }}
              onClick={() => handleEventClick(event._id)}
            >
              <div style={{
                height: "200px",
                backgroundColor: "#2d5ba9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
              }}>
                <img
                  src={event.posterURL}
                  alt={event.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
              </div>
              <div style={{
                backgroundColor: "#4286f4",
                padding: "10px",
                textAlign: "center", // Center the text content
                color: "white"
              }}>
                <p>{event.provider || "Provider"}</p>
                <p>{event.timing ? event.timing.split('|')[0].replace('date:', '').trim() : "Date not specified"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAllEventList;