import React from "react";
import Header from "../../components/Header";
import EventMod from "../../components/Event&Mod";
import m1 from "../../assets/member1.jpg";
import e1 from "../../assets/event1.jpg";
import e2 from "../../assets/event2.jpg";
import c1 from "../../assets/club.jpg";
import { useNavigate } from "react-router-dom";

// Sample user data - in a real app, you would fetch this from an API
const userData = {
  id: 1,
  name: "User 1",
  favoriteEvents: [
    { id: 101, image: e1, title: "Summer Camp" },
    { id: 102, image: e2, title: "Winter Event" }
  ],
  joinedClubs: [
    { id: 1, image: c1, name: "Computer Club" },
    { id: 2, image: c1, name: "Cultural Club" }
  ]
};

function UserProfilePage() {
  const navigate = useNavigate();

  const handleClubClick = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  return (
    <div>
      <Header />
      <div className="pageBody">
        <div className={"info"}>
          <img src={m1} alt="Member Profile Pic" className={"profImg"} />
          <h1>{userData.name}</h1>
        </div>

        {/* Favorite Events Section */}
        <h2>Favorite Events</h2>
        <div className={"EventsList"}>
          {userData.favoriteEvents.map((event, index) => (
            <EventMod 
              key={event.id} 
              src={event.image} 
              user={index === 0 ? 2 : undefined} 
              onClick={() => navigate(`/event/${event.id}`)}
            />
          ))}
        </div>

        {/* Joined Clubs Section */}
        <h2>Joined clubs</h2>
        <div className={"EventsList"}>
          {userData.joinedClubs.map((club) => (
            <div 
              key={club.id} 
              className={"joinedClub"} 
              onClick={() => handleClubClick(club.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={club.image} alt={`Club Icon`} className={"memberPic"} />
              <h3>club</h3>
            </div>
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}

export default UserProfilePage;