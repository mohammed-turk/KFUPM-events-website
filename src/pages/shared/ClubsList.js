import React, { useEffect, useState } from "react";
import ReturnHeader from "../../components/ReturnHeader";
import "./ClubList.css"; // Make sure this line is here to load styles

function ClubsList() {
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

  return (
    <div>
      <ReturnHeader />

      <div className="pageBody ClubsListPage">
        <h2 className="clubs-title">Clubs & Colleges</h2>

        <div className="club-grid">
          {clubs.map((club, index) => (
            <div key={index} className="club-card">
              <div className="club-img-wrapper">
                <img
                  src={club.iconURL || "https://via.placeholder.com/120"}
                  alt={club.name}
                  className="club-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
              </div>
              <p className="club-name">{club.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClubsList;
