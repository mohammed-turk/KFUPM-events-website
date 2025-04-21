import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserHomePage.css";

import HOmePageHeader from "../../components/HomePageHeader";
import clubIcon from "../../assets/club.jpg";
import eventPlaceholder from "../../assets/event1.jpg";
import eventPlaceholder2 from "../../assets/event2.jpg";
import editIcon from "../../assets/icons/mod.png";
import EventsCalendar from "../../components/EventsCalendar";

function HomeUser() {
  const navigate = useNavigate();

  const handleClubClick = (clubId) => {
    console.log(`Clicked on club with ID: ${clubId}`);
    navigate(`/admin/club/${clubId}`);
  };

  const handleEventClick = (eventId) => {
    console.log(`Clicked on event with ID: ${eventId}`);
    navigate(`/admin/event/${eventId}`);
  };

  const showAll = () => {
    navigate("/ClubsList");
  };

  const showMore = () => {
    navigate("/user/eventList");
  };

  return (
    <div className="home-admin-container">
      <HOmePageHeader name="user" />

      {/* Clubs Section */}
      <section className="section-box">
        <h2 className="section-title">Clubs & Colleges</h2>
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
          <button className="show-all-button" onClick={showAll}>
            Show All
          </button>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-box">
        <h2 className="section-title">Events</h2>
        <div className="events-carousel">
          <button className="event-card" onClick={() => handleEventClick(101)}>
            <div className="event-poster-container">
              <img
                src={eventPlaceholder}
                alt="Event Poster"
                className="event-poster"
              />
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
              />
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
        </div>
        <button className="show-more-button-carousel" onClick={showMore}>
          &gt; <span className="show-more-text">Show more</span>
        </button>
      </section>

      {/* Calendar Section */}
      <section className="section-box calendar-section">
        <h2 className="section-title">Calendar</h2>
        <EventsCalendar />
      </section>
    </div>
  );
}

export default HomeUser;
