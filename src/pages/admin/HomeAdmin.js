import React from "react";
import "./HomeAdmin.css"; // Ensure this CSS file exists and has styles
import HOmePageHeader from "../../components/HomePageHeader"; // Adjust path if needed
import Header from "../../components/Header"; // Adjust path if needed

import clubIcon from "../../assets/club.jpg"; // Adjust path to your club icon
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg"; // Adjust path to a placeholder event image
import editIcon from "../../assets/icons/mod.png"; // Adjust path to your edit icon
import { useNavigate } from "react-router-dom";
import EventsCalendar from "../../components/EventsCalendar";
function HomeAdmin() {
  const navigate = useNavigate();

  const handleClubClick = (clubId) => {
    // Replace with actual logic to navigate to the club's page
    console.log(`Clicked on club with ID: ${clubId}`);
    navigate(`/admin/club/${clubId}`); // Example navigation
  };

  const handleEventClick = (eventId) => {
    // Replace with actual logic to navigate to the event's details page
    console.log(`Clicked on event with ID: ${eventId}`);
    navigate(`/admin/event/${eventId}`); // Example navigation
  };

  const showAll = () => {
    navigate("/AdminClubsList");
  };

  const showMore = () => {
    navigate("/admin/eventList");
  };

  const addOrg = () => {
    navigate("/admin/addOrg");
  };

  return (
    <div className="home-admin-container">
      <HOmePageHeader name="admin" />
      <section className="clubs-section">
        <h2>Clubs & Colleges</h2>
        <div className="clubs-grid">
          <button className="club-item" onClick={() => handleClubClick(1)}>
            <img src={clubIcon} alt="Club Icon" className="club-icon" />
            <p className="club-label">Club icon</p>
          </button>
          <button className="club-item" onClick={() => handleClubClick(2)}>
            <img src={clubIcon} alt="Club Icon" className="club-icon" />
            <p className="club-label">Club icon</p>
          </button>
          <button className="club-item" onClick={() => handleClubClick(3)}>
            <img src={clubIcon} alt="Club Icon" className="club-icon" />
            <p className="club-label">Club icon</p>
          </button>
          <button className="show-all-button" onClick = {showAll}>Show All</button>
        </div>
      </section>

      <section className="events-section">
        <h2>Events</h2>
        <div className="events-carousel">
          <button className="event-card" onClick={() => handleEventClick(101)}>
            <div className="event-poster-container">
              <img
                src={eventPlaceholder}
                alt="Event Poster"
                className="event-poster"
                style={{ objectFit: "cover" }}
              />{" "}
              {/* Added inline style for objectFit */}
            </div>
            <div className="event-info">
              <p className="provider-date">
                provider
                <br />
                Date & time
              </p>
              <button className="edit-button">
                <img src={editIcon} alt="Edit" className="edit-icon-img" />
              </button>
            </div>
          </button>
          <button className="event-card" onClick={() => handleEventClick(102)}>
            <div className="event-poster-container">
              <img
                src={eventPlaceholder2}
                alt="Event Poster"
                className="event-poster"
                style={{ objectFit: "cover" }}
              />{" "}
              {/* Added inline style for objectFit */}
            </div>
            <div className="event-info">
              <p className="provider-date">
                provider
                <br />
                Date & time
              </p>
              <button className="edit-button">
                <img src={editIcon} alt="Edit" className="edit-icon-img" />
              </button>
            </div>
          </button>

          {/* Moved the "Show more" button outside the last event card */}
          <button className="show-more-button-carousel" onClick = {showMore}>
            &gt; <span className="show-more-text">Show more</span>
          </button>
        </div>
      </section>

      <section className="calendar-section">

        <EventsCalendar />
        <button className="sign-out-btn " onClick={addOrg}>
        add Organization
      </button> 
      </section>
    </div>
  );
}

export default HomeAdmin;
