import React, { useState } from "react";
import Header from "../../components/Header";

function AdminAllEventList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'EventPoster', provider: 'provider', date: 'Date & time' },
    { id: 2, title: 'EventPoster', provider: 'provider', date: 'Date & time' },
    { id: 3, title: 'EventPoster', provider: 'provider', date: 'Date & time' },
    { id: 4, title: 'EventPoster', provider: 'provider', date: 'Date & time' },
    { id: 5, title: 'EventPoster', provider: 'provider', date: 'Date & time' },
    { id: 6, title: 'EventPoster', provider: 'provider', date: 'Date & time' },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEvent = () => {
    // Function to add a new event
    const newEvent = {
      id: events.length + 1,
      title: 'New Event',
      provider: 'New Provider',
      date: 'New Date & time'
    };
    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    // Function to delete an event
    setEvents(events.filter(event => event.id !== id));
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.provider.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2>All Events</h2>
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
              position: "relative" // Added for absolute positioning of X button
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
                <h3>{event.title}</h3>
              </div>
              <div style={{
                backgroundColor: "#4286f4",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{color: "white"}}>
                  <p>{event.provider}</p>
                  <p>{event.date}</p>
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

export default AdminAllEventList;