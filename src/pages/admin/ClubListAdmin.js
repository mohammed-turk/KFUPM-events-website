import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClubsListAdmin.css";

function ClubsListAdmin() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h2 className="admin-title">Clubs & Colleges Management</h2>

      <div className="admin-top-bar">
        <input
          type="text"
          placeholder="Search by name..."
          className="admin-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={() => navigate("./addOrg")}>
          ＋ Add Club
        </button>
      </div>

      <div className="admin-grid">
        {filteredClubs.map((club, index) => (
          <div key={index} className="admin-card">
            <div className="admin-img-wrapper">
              <img
                src={club.iconURL || "https://via.placeholder.com/120"}
                alt={club.name}
                className="admin-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/120";
                }}
              />
            </div>
            <p className="admin-club-name">{club.name}</p>
            <div className="admin-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubsListAdmin;
