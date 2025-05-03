import React, { useState } from "react";
import Header from "../../components/Header";

// Make sure the component is defined as a function
function UserAllEventList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "EventPoster",
      provider: "provider",
      date: "Date & time",
      added: false,
    },
    {
      id: 2,
      title: "EventPoster",
      provider: "provider",
      date: "Date & time",
      added: false,
    },
    {
      id: 3,
      title: "EventPoster",
      provider: "provider",
      date: "Date & time",
      added: false,
    },
    {
      id: 4,
      title: "EventPoster",
      provider: "provider",
      date: "Date & time",
      added: false,
    },
    {
      id: 5,
      title: "EventPoster",
      provider: "provider",
      date: "Date & time",
      added: false,
    },
    {
      id: 6,
      title: "EventPoster",
      provider: "provider",
      date: "Date & time",
      added: false,
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToMyList = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, added: !event.added } : event
      )
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="pageBody">
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          Events Listing
        </h1>

        {/* Search Bar */}
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />
        </div>

        {/* Events List */}
        <h2>All Events</h2>
        <div
          className="EventsList"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                width: "300px",
                backgroundColor: "#f0f8ff",
              }}
            >
              <div
                style={{
                  height: "200px",
                  backgroundColor: "#2d5ba9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <h3>{event.title}</h3>
              </div>
              <div
                style={{
                  backgroundColor: "#4286f4",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ color: "white" }}>
                  <p>{event.provider}</p>
                  <p>{event.date}</p>
                </div>
                <button
                  onClick={() => handleAddToMyList(event.id)}
                  style={{
                    backgroundColor: event.added ? "#ff9800" : "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title={event.added ? "Remove from my list" : "Add to my list"}
                >
                  {event.added ? "✓" : "+"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Make sure to use the proper export statement
export default UserAllEventList;
