import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

function OrgAllEventList() {
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEvent = () => {
    // Function to add a new event (you might want to pre-fill the provider here)
    const newEvent = {
      id: events.length + 1,
      title: 'New Event',
      provider: loggedInUsername || 'Unknown Provider', // Set provider to logged-in user
      date: 'New Date & time'
    };
    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    // Function to delete an event
    setEvents(events.filter(event => event.id !== id));
  };

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.provider?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header type={"Organizer Mode"} />
      <div className="pageBody">
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>My Events</h1> {/* Changed heading */}

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
            placeholder="Search my events..." // Updated placeholder
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
            onClick={handleAddEvent}
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
        <h2>My Events</h2> {/* Updated heading */}
        <div className="EventsList" style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "20px"
        }}>
          {filteredEvents.map(event => (
            <div key={event.id} style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              backgroundColor: "#f0f8ff",
              position: "relative"
            }}>
              {/* X Button for Delete */}
              <button
                onClick={() => handleDeleteEvent(event.id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: "1"
                }}
              >
                ×
              </button>

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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ color: "white" }}>
                  <p>{event.provider}</p>
                  
                </div>
                <button style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer"
                }}>
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrgAllEventList;