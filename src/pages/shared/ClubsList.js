import React, { useEffect, useState } from "react";
import ReturnHeader from "../../components/ReturnHeader";
import "./ClubList.css"; // Make sure this line is here to load styles
import { useNavigate } from "react-router-dom";


function ClubsList() {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

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

  const handleEventClick = (clubid) => {
    navigate(`/club/${clubid}`, {
    });
  };

  return (
    <div>
      <ReturnHeader />

      <div className="pageBody ClubsListPage">
        <h2 className="clubs-title">Clubs & Colleges</h2>

        <div className="club-grid">
          {clubs.map((club, index) => (
            <button style={{backgroundColor:"transparent",  border: "none", outline: "none"}} onClick={() => handleEventClick(club._id)}>
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClubsList;
