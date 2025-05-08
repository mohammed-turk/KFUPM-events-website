import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import EventsContainer from "../../components/EventContainer";
import ClubsContainer from "../../components/ClubContainer";
const username = localStorage.getItem("username");

function UserProfilePage() {
  const navigate = useNavigate();
  const[favEvents, setFavEvents] = useState([]);
  const[joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    // Fetch both clubs and events when component mounts
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const payload = JSON.parse(atob(token.split(".")[1])); // Extract payload
        const userId = payload.id;
        console.log("fetching events...");
        // Fetch events
        const eventsRes = await fetch(`http://localhost:3000/api/fav?userid=${userId}`);
        if (!eventsRes.ok) {
          throw new Error(`Events API returned ${eventsRes.status}`);
        }
        const favEvents = await eventsRes.json();

        // Fetch clubs
        const clubsRes = await fetch(`http://localhost:3000/api/joined?userid=${userId}`);
        if (!clubsRes.ok) {
          throw new Error(`Clubs API returned ${clubsRes.status}`);
        }
        const clubsData = await clubsRes.json();

        console.log("Fetched events:", favEvents);
        console.log("Fetched clubs:", clubsData);

        if (Array.isArray(favEvents)) {
          setFavEvents(favEvents);
        } else {
          console.error("Events API response is not an array:", favEvents);
          setFavEvents([]);
        }

        if (Array.isArray(clubsData)) {
          setJoinedClubs(clubsData);
        } else {
          console.error("Clubs API response is not an array:", clubsData);
          setJoinedClubs([]);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="pageBody">
          <h1 style={{margin:"75px 70px", letterSpacing:"5px", textDecoration:"underline"}}>{username}</h1>


        {/* Favorite Events Section */}
        <h3>Favorite Events</h3>
        <EventsContainer events={favEvents} max={favEvents.length}/>
        <br/> <br/>

        {/* Joined Clubs Section */}
        <h3>Joined clubs</h3>
        <ClubsContainer clubs={joinedClubs} max={joinedClubs.length}/>

      </div>
    </div>
  );
}

export default UserProfilePage;